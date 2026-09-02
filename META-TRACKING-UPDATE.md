# Meta Tracking Update

This version updates the Trisara website's Meta tracking without changing the existing admin workflow.

## What changed

- Server-side CAPI now sends the initial `Lead` event for website enquiry, offer and booking submissions.
- Browser Pixel and CAPI use the same `event_id` for each submission, allowing Meta to deduplicate them.
- `_fbp` is captured and passed to CAPI.
- `_fbc` is captured and, when necessary, generated from the `fbclid` URL parameter and persisted in a first-party cookie.
- Email, first name, last name, phone, IP address, user agent and hashed external ID are sent when available.
- `event_source_url` is included.
- Enquiry modal now accepts an optional email address.
- Admin status changes no longer send `Lead` for every status.
- `qualified` sends one `QualifiedLead` custom event.
- `booked` sends one `BookedLead` custom event.
- `unqualified` and `spam` are intentionally not sent as conversions.
- Duplicate qualified/booked feedback is prevented with stored timestamps.

## Environment variables

Keep these in the deployment environment (do not commit the access token):

```env
META_PIXEL_ID=1332486825534463
META_ACCESS_TOKEN=your-existing-meta-conversions-api-access-token
META_API_VERSION=v21.0
```

Existing admin/MongoDB variables remain unchanged.

## Meta-side next step

After deployment and testing, verify the new `Lead`, `QualifiedLead` and `BookedLead` events in Events Manager. Do not immediately change the campaign optimization event. First collect clean qualification data and confirm that the downstream event is arriving with good match quality.
