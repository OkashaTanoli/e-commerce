export const products = {
    name: 'products',
    title: 'Products',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'type',
            title: 'Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Sweater', value: 'Sweater' },
                    { title: 'Dress', value: 'Dress' },
                    { title: 'Pants', value: 'Pants' },
                    { title: 'Jackets', value: 'Jackets' },
                    { title: 'T Shirts', value: 'T Shirts' },
                ],
            },
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Female', value: 'female' },
                    { title: 'Male', value: 'male' },
                    { title: 'Kids', value: 'kids' },
                ],
            },
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'sizes',
            title: 'sizes',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'XS', value: 'xs' },
                    { title: 'S', value: 's' },
                    { title: 'M', value: 'm' },
                    { title: 'L', value: 'l' },
                    { title: 'XL', value: 'xl' },
                ]
            },
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'description',
            title: 'description',
            type: 'array',
            of: [{ type: 'block' }],
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                layout: 'grid',
            },
            validation: (Rule: any) => Rule.required()
        },
        {
            name: 'care',
            title: 'Care',
            type: 'array',
            of: [{ type: 'string' }],
            validation: (Rule: any) => Rule.required()
        },

    ]
}