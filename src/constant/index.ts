export const BASE_URL = "http://localhost:8080";
export const FORMAT_DATE_YYYY_MM_DD = "YYYY-MM-DD";

const bannerSrcMapping = () => {
    return Array(6).fill(1).map((i, index) => {
        return `/assets/banner/banner_0${i + index}.jpg`
    })
}

export const BANNERS = bannerSrcMapping()
