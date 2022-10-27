import WPAPI from "wpapi";
import AppConfig from '@common/AppConfig';

var wpApi = new WPAPI({
    endpoint: AppConfig.URL.root + '/wp-json'
});

export default wpApi;
