import { NextResponse } from 'next/server';

const OWNER = process.env.GITHUB_OWNER || 'sanjay091920';
const REPO  = process.env.GITHUB_REPO  || 'crearelabs';
const PATH  = 'lib/content.json';

function ghHeaders() {
  return {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
    'User-Agent': 'Crearelabs-Admin/1.0',
  };
}

/* Read current content.json from GitHub */
async function readContent() {
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`,
    { headers: ghHeaders(), cache: 'no-store' }
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`GitHub read failed (${res.status}): ${err.message}`);
  }
  const data = await res.json();
  const text = Buffer.from(data.content, 'base64').toString('utf-8');
  return { content: JSON.parse(text), sha: data.sha };
}

/* Write updated content.json to GitHub (triggers Vercel redeploy) */
async function writeContent(content, sha, message) {
  const encoded = Buffer.from(JSON.stringify(content, null, 2)).toString('base64');
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`,
    {
      method: 'PUT',
      headers: ghHeaders(),
      body: JSON.stringify({ message, content: encoded, sha }),
    }
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`GitHub write failed (${res.status}): ${err.message}`);
  }
  return res.json();
}

/* GET — load current content for the admin UI */
export async function GET() {
  if (!process.env.GITHUB_TOKEN) {
    return NextResponse.json({
      error: 'GITHUB_TOKEN not set',
      hint: 'Add GITHUB_TOKEN in Vercel → Settings → Environment Variables, then redeploy.',
    }, { status: 503 });
  }
  try {
    const { content } = await readContent();
    return NextResponse.json(content);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/* POST — save section update → auto-deploy triggered */
export async function POST(req) {
  if (!process.env.GITHUB_TOKEN) {
    return NextResponse.json({
      error: 'GITHUB_TOKEN not set. Add it in Vercel → Settings → Environment Variables, then redeploy.',
    }, { status: 503 });
  }
  try {
    let body;
    try { body = await req.json(); }
    catch { return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 }); }

    const { section, data, message } = body;
    if (!section || !data) {
      return NextResponse.json({ error: 'Missing section or data.' }, { status: 400 });
    }

    /* Read → merge → write */
    const { content: current, sha } = await readContent();
    const updated = { ...current, [section]: data };
    const commitMsg = message || `Update ${section} via admin panel`;
    await writeContent(updated, sha, commitMsg);

    return NextResponse.json({
      ok: true,
      message: `✅ ${section} saved! Site will update in ~60 seconds.`,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
