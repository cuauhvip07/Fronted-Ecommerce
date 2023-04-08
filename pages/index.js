import Layout from "@/layout/layout"

export default function Home() {
  return (
    <Layout
      title="Inicio"
      description="Pagina de inicio  de floreria jardin del eden"
    >
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <h5>Hola mundo</h5>
          </div>
        </div>
      </div>
    </Layout>
  )
}
