//v1.2.0

const docsListId = '1Ev7Ju4_ykAo43X7Wjo7pDWLsGKuY-E_HHL1gyYDF4sM'
const wl = 'gaco88'
const url = "https://gcp8.autoapprove.pro"

const approve = (id) => {
    const forms = $(.menu-body:contains(${id}))
    if (forms.length != 0) {
        for (let i = 0; i < forms.length; i++) {
            const panelId = $(forms.get(i)).find('.copy-btn-usnm')[0].innerHTML
            if (panelId == id) {
                console.log(approving ${id})
                $(forms.get(i)).find('.approve')[0].click()

                console.log(confirm approve ${id})

                $('.swal-button--confirm')[0].click()
                break
            }
        }
    }
}

async function main() {
    const numberFormatter = Intl.NumberFormat('en-US')
    //get all id
    try {
        const rawListIds = await fetch(
            ${MAIN_URL}/${docsListId}/${wl},
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        )

        const { listIDs: listIds, listIndex } = await rawListIds.json()

        let bcaId = listIds.bca
        const bcaIndex = listIndex.bca

        let danaId = listIds.dana
        const danaIndex = listIndex.dana

        let danaMediumId = listIds.danaMedium
        const danaMediumIndex = listIndex.danaMedium

        let cimbId = listIds.cimb
        const cimbIndex = listIndex.cimb

        let mandiriId = listIds.mandiri
        const mandiriIndex = listIndex.mandiri

        let bniId = listIds.bni
        const bniIndex = listIndex.bni

        let briId = listIds.bri
        const briIndex = listIndex.bri

        /*
            BCA 
        */
        console.log('BCA')
        let bank = 'BCANEW'
        let pendingForms = []
        let selectedIds = []
        let selectedTransactionIds = []
        let docRows = await fetch(
            https://gcp8.autoapprove.pro/?id=${bcaId}&bank=${bank}&index=${bcaIndex}&wl=${wl}
        )

        let count = 0
        let data = await docRows.json()
        data = data
            .map((d) => {
                return {
                    name: d.name,
                    coin: numberFormatter.format(
                        Math.floor(d.coin.replace(/,/g, ''))
                    ),
                    row: d.row,
                    bank: d.bank,
                }
            })
            .filter((d) => {
                return (
                    !d.name.startsWith('BIAYA') && !d.name.startsWith('PINDAH')
                )
            })
        console.log(data)
        data.forEach(({ name, coin, row, bank }) => {
            let forms = $(.menu-body:contains(${name}))
            if (forms.length != 0 && count < 20) {
                for (let i = 0; i < forms.length; i++) {
                    console.log(forms)
                    let playerName = $(forms.get(i)).find('.bankaccnm')[0]
                        .innerHTML
                    let transactionId = $(forms.get(i)).find('.textTrxNo')[0]
                        .textContent
                    let bankName = $($(forms.get(i)).find('.textBank')[1])
                        .text()
                        .trim()
                        .toUpperCase()
                    bankName = bankName.substring(1, bankName.length - 1)
                    if (
                        $(forms.get(i)).find('.amount-monitor')[0].innerHTML ==
                            coin &&
                        playerName.indexOf(name) != -1 &&
                        !selectedIds.includes(
                            $(forms.get(i)).find('.copy-btn-usnm')[0].innerHTML
                        ) &&
                        !selectedTransactionIds.includes(transactionId) &&
                        bank.indexOf(bankName) != -1
                    ) {
                        pendingForms.push({
                            id: $(forms.get(i)).find('.copy-btn-usnm')[0]
                                .innerHTML,
                            name,
                            coin,
                            row,
                            bank,
                        })
                        selectedIds.push(
                            $(forms.get(i)).find('.copy-btn-usnm')[0].innerHTML
                        )
                        selectedTransactionIds.push(transactionId)
                        count++
                    }
                }
            }
        })

        if (selectedIds.length != 0) {
            const rawIds = await fetch(MAIN_URL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    docsId: bcaId,
                    data: pendingForms,
                    index: bcaIndex,
                    bank,
                    wl,
                }),
            })

            const ids = await rawIds.json()

            console.log(ids)

            for (let i = 0; i < ids.length; i++) {
                approve(ids[i])
            }
        }

        //
        console.log('DANA')
        bank = 'DANANEW'
        pendingForms = []
        selectedIds = []
        selectedTransactionIds = []
        docRows = await fetch(
            https://gcp8.autoapprove.pro/?id=${danaId}&bank=${bank}&index=${danaIndex}&wl=${wl}
        )

        count = 0
        data = await docRows.json()
        data = data
            .map((d) => {
                return {
                    name: d.name,
                    coin: numberFormatter.format(
                        Math.floor(d.coin.replace(/,/g, ''))
                    ),
                    row: d.row,
                    bank: d.bank,
                }
            })
            .filter((d) => {
                return (
                    !d.name.startsWith('BIAYA') && !d.name.startsWith('PINDAH')
                )
            })
        console.log(data)

        data.forEach(({ name, coin, row, bank }) => {
            let forms = $(.menu-body:contains(${name}))
            if (forms.length != 0 && count < 20) {
                for (let i = 0; i < forms.length; i++) {
                    console.log(forms)
                    let playerName = $(forms.get(i)).find('.bankaccnm')[0]
                        .innerHTML
                    let transactionId = $(forms.get(i)).find('.textTrxNo')[0]
                        .textContent
                    let bankName = $($(forms.get(i)).find('.textBank')[1])
                        .text()
                        .trim()
                        .toUpperCase()
                    bankName = bankName.substring(1, bankName.length - 1)
                    if (
                        $(forms.get(i)).find('.amount-monitor')[0].innerHTML ==
                            coin &&
                        playerName.indexOf(name) != -1 &&
                        !selectedIds.includes(
                            $(forms.get(i)).find('.copy-btn-usnm')[0].innerHTML
                        ) &&
                        !selectedTransactionIds.includes(transactionId) &&
                        bank.indexOf(bankName) != -1
                    ) {
                        pendingForms.push({
                            id: $(forms.get(i)).find('.copy-btn-usnm')[0]
                                .innerHTML,
                            name,
                            coin,
                            row,
                            bank,
                        })
                        selectedIds.push(
                            $(forms.get(i)).find('.copy-btn-usnm')[0].innerHTML
                        )
                        selectedTransactionIds.push(transactionId)
                        count++
                    }
                }
            }
        })

if (selectedIds.length != 0) {
            const rawIds = await fetch('https://gcp8.autoapprove.pro', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    docsId: danaId,
                    data: pendingForms,
                    index: danaIndex,
                    bank,
                    wl,
                }),
            })

            const ids = await rawIds.json()

            console.log(ids)

            for (let i = 0; i < ids.length; i++) {
                approve(ids[i])
            }
        }

        //
        console.log('CIMB')
        bank = 'CIMB'
        pendingForms = []
        selectedIds = []
        selectedTransactionIds = []
        docRows = await fetch(
            https://gcp8.autoapprove.pro/?id=${cimbId}&bank=${bank}&index=${cimbIndex}&wl=${wl}
        )

        count = 0
        data = await docRows.json()
        data = data
            .map((d) => {
                return {
                    name: d.name,
                    coin: numberFormatter.format(
                        Math.floor(d.coin.replace(/,/g, ''))
                    ),
                    row: d.row,
                    bank: d.bank,
                }
            })
            .filter((d) => {
                return (
                    !d.name.startsWith('BIAYA') && !d.name.startsWith('PINDAH')
                )
            })
        console.log(data)
        data.forEach(({ name, coin, row, bank }) => {
            let forms = $(.menu-body:contains(${name}))
            if (forms.length != 0 && count < 20) {
                for (let i = 0; i < forms.length; i++) {
                    console.log(forms)
                    let playerName = $(forms.get(i)).find('.bankaccnm')[0]
                        .innerHTML
                    let transactionId = $(forms.get(i)).find('.textTrxNo')[0]
                        .textContent
                    let bankName = $($(forms.get(i)).find('.textBank')[1])
                        .text()
                        .trim()
                        .toUpperCase()
                    bankName = bankName.substring(1, bankName.length - 1)
                    if (
                        $(forms.get(i)).find('.amount-monitor')[0].innerHTML ==
                            coin &&
                        playerName.indexOf(name) != -1 &&
                        !selectedIds.includes(
                            $(forms.get(i)).find('.copy-btn-usnm')[0].innerHTML
                        ) &&
                        !selectedTransactionIds.includes(transactionId) &&
                        bankName.indexOf(bank) != -1
                    ) {
                        pendingForms.push({
                            id: $(forms.get(i)).find('.copy-btn-usnm')[0]
                                .innerHTML,
                            name,
                            coin,
                            row,
                            bank,
                        })
                        selectedIds.push(
                            $(forms.get(i)).find('.copy-btn-usnm')[0].innerHTML
                        )
                        selectedTransactionIds.push(transactionId)
                        count++
                    }
                }
            }
        })

        if (selectedIds.length != 0) {
            const rawIds = await fetch('https://gcp8.autoapprove.pro', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    docsId: cimbId,
                    data: pendingForms,
                    index: cimbIndex,
                    bank,
                    wl,
                }),
            })

            const ids = await rawIds.json()

            console.log(ids)

for (let i = 0; i < ids.length; i++) {
                approve(ids[i])
            }
        }

        //
        console.log('MANDIRI')
        bank = 'MANDIRI'
        pendingForms = []
        selectedIds = []
        selectedTransactionIds = []
        docRows = await fetch(
            https://gcp8.autoapprove.pro/?id=${mandiriId}&bank=${bank}&index=${mandiriIndex}&wl=${wl}
        )

        count = 0
        data = await docRows.json()
        data = data
            .map((d) => {
                return {
                    name: d.name,
                    coin: numberFormatter.format(
                        Math.floor(d.coin.replace(/,/g, ''))
                    ),
                    row: d.row,
                    bank: d.bank,
                }
            })
            .filter((d) => {
                return (
                    !d.name.startsWith('BIAYA') && !d.name.startsWith('PINDAH')
                )
            })
        console.log(data)
        data.forEach(({ name, coin, row, bank }) => {
            let forms = $(.menu-body:contains(${name}))
            if (forms.length != 0 && count < 20) {
                for (let i = 0; i < forms.length; i++) {
                    console.log(forms)
                    let playerName = $(forms.get(i)).find('.bankaccnm')[0]
                        .innerHTML
                    let transactionId = $(forms.get(i)).find('.textTrxNo')[0]
                        .textContent
                    let bankName = $($(forms.get(i)).find('.textBank')[1])
                        .text()
                        .trim()
                        .toUpperCase()
                    bankName = bankName.substring(1, bankName.length - 1)
                    if (
                        $(forms.get(i)).find('.amount-monitor')[0].innerHTML ==
                            coin &&
                        playerName.indexOf(name) != -1 &&
                        !selectedIds.includes(
                            $(forms.get(i)).find('.copy-btn-usnm')[0].innerHTML
                        ) &&
                        !selectedTransactionIds.includes(transactionId) &&
                        bank.indexOf(bankName) != -1
                    ) {
                        pendingForms.push({
                            id: $(forms.get(i)).find('.copy-btn-usnm')[0]
                                .innerHTML,
                            name,
                            coin,
                            row,
                            bank,
                        })
                        selectedIds.push(
                            $(forms.get(i)).find('.copy-btn-usnm')[0].innerHTML
                        )
                        selectedTransactionIds.push(transactionId)
                        count++
                    }
                }
            }
        })

        if (selectedIds.length != 0) {
            const rawIds = await fetch('https://gcp8.autoapprove.pro', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    docsId: mandiriId,
                    data: pendingForms,
                    index: mandiriIndex,
                    bank,
                    wl,
                }),
            })

            const ids = await rawIds.json()

            console.log(ids)

            for (let i = 0; i < ids.length; i++) {
                approve(ids[i])
            }
        }

        //
        console.log('BNI')
        bank = 'BNI'
        pendingForms = []
        selectedIds = []
        selectedTransactionIds = []
        docRows = await fetch(
            https://gcp8.autoapprove.pro/?id=${bniId}&bank=${bank}&index=${bniIndex}&wl=${wl}
        ) 

        count = 0
        data = await docRows.json()
        data = data
            .map((d) => {
                return {
                    name: d.name,
                    coin: numberFormatter.format(
                        Math.floor(d.coin.replace(/,/g, ''))
                    ),
                    row: d.row,
                    bank: d.bank,
                }
            })
            .filter((d) => {
                return (
                    !d.name.startsWith('BIAYA') && !d.name.startsWith('PINDAH')
                )
            })
        console.log(data)
        data.forEach(({ name, coin, row, bank }) => {
            let forms = $(.menu-body:contains(${name}))
            if (forms.length != 0 && count < 20) {
                for (let i = 0; i < forms.length; i++) {
                    console.log(forms)
                    let playerName = $(forms.get(i)).find('.bankaccnm')[0]
                        .innerHTML
                    let transactionId = $(forms.get(i)).find('.textTrxNo')[0]
                        .textContent
                    let bankName = $($(forms.get(i)).find('.textBank')[1])
                        .text()
                        .trim()
                        .toUpperCase()
                    bankName = bankName.substring(1, bankName.length - 1)
                    if (
                        $(forms.get(i)).find('.amount-monitor')[0].innerHTML ==
                            coin &&
                        playerName.indexOf(name) != -1 &&
                        !selectedIds.includes(
                            $(forms.get(i)).find('.copy-btn-usnm')[0].innerHTML
                        ) &&
                        !selectedTransactionIds.includes(transactionId) &&
                        bank.indexOf(bankName) != -1
                    ) {
                        pendingForms.push({
                            id: $(forms.get(i)).find('.copy-btn-usnm')[0]
                                .innerHTML,
                            name,
                            coin,
                            row,
                            bank,
                        })
                        selectedIds.push(
                            $(forms.get(i)).find('.copy-btn-usnm')[0].innerHTML
                        )
                        selectedTransactionIds.push(transactionId)
                        count++
                    }
                }
            }
        })

        if (selectedIds.length != 0) {
            const rawIds = await fetch('https://gcp8.autoapprove.pro', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    docsId: bniId,
                    data: pendingForms,
                    index: bniIndex,
                    bank,
                    wl,
                }),
            })

            const ids = await rawIds.json()

            console.log(ids)

            for (let i = 0; i < ids.length; i++) {
                approve(ids[i])
            }
        }

        //
        console.log('BRI')
        bank = 'BRI'
        pendingForms = []
        selectedIds = []
        selectedTransactionIds = []
        docRows = await fetch(https://gcp8.autoapprove.pro/?id=${briId}&bank=${bank}&index=${briIndex}&wl=${wl})

        count = 0
        data = await docRows.json()
        data = data
            .map((d) => {
                return {
                    name: d.name,
                    coin: numberFormatter.format(
                        Math.floor(d.coin.replace(/,/g, ''))
                    ),
                    row: d.row,
                    bank: d.bank,
                }
            })
            .filter((d) => {
                return (
                    !d.name.startsWith('BIAYA') && !d.name.startsWith('PINDAH')
                )
            })
        console.log(data)
        data.forEach(({ name, coin, row, bank }) => {
            let forms = $(.menu-body:contains(${name}))
            if (forms.length != 0 && count < 20) {
                for (let i = 0; i < forms.length; i++) {
                    console.log(forms)
                    let playerName = $(forms.get(i)).find('.bankaccnm')[0]
                        .innerHTML
                    let transactionId = $(forms.get(i)).find('.textTrxNo')[0]
                        .textContent
                    let bankName = $($(forms.get(i)).find('.textBank')[1])
                        .text()
                        .trim()
                        .toUpperCase()
                    bankName = bankName.substring(1, bankName.length - 1)
                    if (
                        $(forms.get(i)).find('.amount-monitor')[0].innerHTML ==
                            coin &&
                        playerName.indexOf(name) != -1 &&
                        !selectedIds.includes(
                            $(forms.get(i)).find('.copy-btn-usnm')[0].innerHTML
                        ) &&
                        !selectedTransactionIds.includes(transactionId) &&
                        bank.indexOf(bankName) != -1
                    ) {
                        pendingForms.push({
                            id: $(forms.get(i)).find('.copy-btn-usnm')[0]
                                .innerHTML,
                            name,
                            coin,
                            row,
                            bank,
                        })
                        selectedIds.push(
                            $(forms.get(i)).find('.copy-btn-usnm')[0].innerHTML
                        )
                        selectedTransactionIds.push(transactionId)
                        count++
                    }
                }
            }
        })

        if (selectedIds.length != 0) {
            const rawIds = await fetch('https://gcp8.autoapprove.pro', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    docsId: briId,
                    data: pendingForms,
                    index: briIndex,
                    bank,
                    wl,
                }),
            })

            const ids = await rawIds.json()

            console.log(ids)

            for (let i = 0; i < ids.length; i++) {
                approve(ids[i])
            }
        }
    } catch (error) {
        console.log('TIMEOUT')
    }
    await main()
}

await main()