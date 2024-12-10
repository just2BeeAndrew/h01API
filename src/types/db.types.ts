enum Resolution {
    P144 = 'P144',
    P240 = 'P240',
    P360 = 'P360',
    P480 = 'P480',
    P720 = 'P720',
    P1080 = 'P1080',
    P1440 = 'P1440',
    P2160 = 'P2160',
}
export type DBType = { // типизация базы данных (что мы будем в ней хранить)
    videos: [{
        id: number
        title: string
        author: string
        canBeDownloaded: boolean | false,
        minAgeRestriction: number | null,
        createdAt: string
        publicationDate: string,
        availableResolution: Resolution [] | null,
    }]
}