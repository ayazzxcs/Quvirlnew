// Force the old Cloudflare Pages subdomain to the new Quvirl domain.
// This prevents Google from choosing droptrend.pages.dev as the canonical version.
export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.hostname === 'droptrend.pages.dev' || url.hostname.endsWith('.droptrend.pages.dev')) {
    url.hostname = 'quvirl.com';
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }

  return context.next();
}
