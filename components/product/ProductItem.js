import Link from 'next/link';

const ProductItem = ({product}) => {

    const renderLinkItem = () => {
        return(
            <>
                <Link href={`product/${product._id}`}>
                    <a className="btn btn-info" style={{marginRight: 5, flex: 1}}>View</a>
                </Link>
                <button className="btn btn-success"  style={{marginLeft: 5, flex: 1}}>
                    Buy
                </button>
            </>
        )
    }
    return (
        <div className="card" style={{ width: "18rem"}}>
            <img className="card-img-top" src={product.images[0].url} alt="Card image cap" />
            <div className="card-body">
                <h5 className="card-title text-capitalize" title={product?.title || "title"}>{product?.title || "Tile"}</h5>
                <div className="row justify-content-between mx-0">
                    <h6 className="text-danger">${product?.price}</h6>
                    {
                        product.inStock > 0
                        ? <h6 className="text-danger">In stock: {product?.inStock}</h6>
                        : <h6 className="text-danger">Out stock</h6>
                    }
                </div>
                <p className="card-text" title={product?.description || ""}>{product?.description || ""}</p>
                <div className="row justify-content-between mx-0">
                    {renderLinkItem()}
                </div>
            </div>
        </div>
    )
}

export default ProductItem;