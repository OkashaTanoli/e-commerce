import { client } from "../../../../sanity/lib/client";



const getData = async (category: string) => {
    const response = await client.fetch(`*[_type == "products" && category == "${category}"]{images, price, title, type}`)
    return response
}

async function Category({ params }: { params: { category: string } }) {
    const data = await getData(params.category)
    console.log(data)
    return (
        <div className="mt-20">
            <div className="w-[90%] xl:w-[1350px] mx-auto">
                <div className="grid grid-cols-4 gap-10">
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Category;
