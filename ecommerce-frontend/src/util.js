import { orderContain } from './contain'

export const isJsonString = (data) => {
    try {
        JSON.parse(data)
    } catch (error) {
        return false
    }
    return true
}

export const getBase64 = (file, maxWidth = 500, maxSizeKB = 1024) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = () => {
            const img = new Image()
            img.src = reader.result
            img.onload = () => {
                const canvas = document.createElement('canvas')
                const scaleSize = maxWidth / img.width
                canvas.width = maxWidth
                canvas.height = img.height * scaleSize

                const ctx = canvas.getContext('2d')
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

                let quality = 0.9

                const tryCompress = () => {
                    const base64 = canvas.toDataURL('image/jpeg', quality)
                    const sizeInKB = Math.round((base64.length * 3) / 4 / 1024)

                    if (sizeInKB <= maxSizeKB || quality <= 0.1) {
                        resolve(base64)
                    } else {
                        quality -= 0.1
                        tryCompress()
                    }
                }

                tryCompress()
            }

            img.onerror = (err) => reject(err)
        }

        reader.onerror = (err) => reject(err)
    })

export const convertPrice = (price) => {
    try {
        const result = price?.toLocaleString().replaceAll(',', '.')
        return `${result} VND`
    } catch (error) {
        return null
    }
}

export const initFacebookSDK = () => {
    if (window.FB) {
        window.FB.XFBML.parse()
        return
    }

    let locate = 'vi_VN'

    window.fbAsyncInit = function () {
        window.FB.init({
            appId: process.env.REACT_APP_FB_id,
            cookie: true,
            xfbml: true,
            version: 'v23.0',
        })
    }
    ;(function (d, s, id) {
        var js,
            fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) return
        js = d.createElement(s)
        js.id = id
        js.src = `https://connect.facebook.net/${locate}/sdk.js`
        fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')
}

export const convertDataChart = (data, type) => {
    try {
        const object = {}
        Array.isArray(data) &&
            data.forEach((opt) => {
                if (!object[opt[type]]) {
                    object[opt[type]] = 1
                } else {
                    object[opt[type]] += 1
                }
            })
        const results =
            Array.isArray(Object.keys(object)) &&
            Object.keys(object).map((item) => {
                return {
                    name: orderContain.payment[[item]],
                    value: object[item],
                }
            })
        return results
    } catch (e) {
        return []
    }
}
