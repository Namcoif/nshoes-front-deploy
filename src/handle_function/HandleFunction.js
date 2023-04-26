const formatNumberToVND = (value) => {
    const number = new Intl.NumberFormat('vi-IN', {
        style: 'currency',
        currency: 'VND',
        // maximumSignificantDigits: 3
    }).format(value)

    return number
}

const HandleFunction = {
    formatNumberToVND
}

export default HandleFunction