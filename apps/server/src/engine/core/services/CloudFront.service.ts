export class CloudFrontService {
  private _cf_domain = 'https://d2q8bagxdyjqmw.cloudfront.net/';

  get_cf_image_url({ imageKey }: { imageKey: string }) {
    return this._cf_domain + imageKey;
  }
}
