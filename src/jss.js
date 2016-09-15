import {create} from 'jss'
import reactJss from 'react-jss'
import vendorPrefixer from 'jss-vendor-prefixer'

export const jss = create()
export const useSheet = reactJss(jss)

jss.use(vendorPrefixer())
