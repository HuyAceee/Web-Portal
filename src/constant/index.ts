export const BASE_URL = "https://mail.lucifer.io.vn";
export const FORMAT_DATE_YYYY_MM_DD = "YYYY-MM-DD";
export const FORMAT_DATE_DD_MM_YYYY = "DD-YY-YYYY";

const bannerSrcMapping = () => {
    return Array(6).fill(1).map((i, index) => {
        return `/assets/banner/banner_0${i + index}.jpg`
    })
}

const bannerMapMapping = () => {
    return Array(1).fill(1).map((i, index) => {
        return `/assets/banner/map_0${i + index}.jpg`
    })
}

export const BANNERS = bannerSrcMapping()
export const MAPS = bannerMapMapping()
