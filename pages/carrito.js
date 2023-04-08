import Layout from "@/layout/layout"

const CarritoCompras = () => {
  return (
    <Layout
      title="Carrito"
      description="Compras del usuario hasta el momento"
    >
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <h5>Carrito de compras</h5>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CarritoCompras
