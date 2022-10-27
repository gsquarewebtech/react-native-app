/** @format */

import { Config, AppConfig } from '@common'
import WordpressApi from './WordpressApi'

const Api = new WordpressApi({
  url: AppConfig.URL.root,
  logo: AppConfig.URL.logo,
})

export default Api
