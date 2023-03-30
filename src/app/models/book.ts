export interface Book {
    id?: string,
    title: string,
    author: string,
    description: string,
    image: string,
    tags: Array<string>,
    status: boolean
}
