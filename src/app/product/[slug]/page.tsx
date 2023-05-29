import React from 'react';

async function Product({ params }: { params: { slug: string } }) {
    return (
        <div>
            {params.slug}
        </div>
    );
}

export default Product;