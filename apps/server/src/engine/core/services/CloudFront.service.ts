export class CloudFront {
  private _cf_domain = 'd3faxej1ydmtcn.cloudfront.net/';

  get_cf_image_url({ imageKey }: { imageKey: string }) {
    return this._cf_domain + imageKey;
  }
}
