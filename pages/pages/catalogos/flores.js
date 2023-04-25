import React, { useEffect, useState } from "react";
import Layout from "@/layout/layout"
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
// import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';

const CatalogoFlores = () => {
  //--> Variables
  const [flores, setFlores] = useState([])
  const [layout, setLayout] = useState('grid');

  //--> Ejecucion en segundo plano
  useEffect(() => {
    const datosFlores = [
      { nombre: "Rosa", precio: 5.90, categoria: "primavera", estatus: "disponible" },
      { nombre: "Tulipan", precio: 6.20, categoria: "otoño", estatus: "agotado" },
      { nombre: "Girasol", precio: 3.50, categoria: "invierno", estatus: "pocos" },
      { nombre: "Setosa", precio: 25.23, categoria: "primavera", estatus: "pocos" },
      { nombre: "Gardenia", precio: 78.60, categoria: "verano", estatus: "disponible" },
      { nombre: "Versicolor", precio: 84.69, categoria: "verano", estatus: "agotado" },
    ]
    setFlores(datosFlores)
  }, [])

  //--> Indicar estado de la flor
  const getSeverity = (flor) => {
    switch (flor.estatus) {
      case 'disponible':
        return 'success';

      case 'pocos':
        return 'warning';

      case 'agotado':
        return 'danger';

      default:
        return null;
    }
  };

  //--> Modo de vista: lista
  const listItem = (flor) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://media.admagazine.com/photos/61eb22cb9b19d943aa117b30/master/w_1600%2Cc_limit/Girasol.jpg`} alt="girasol" />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{flor.nombre}</div>
              {/* <Rating value={flor.rating} readOnly cancel={false}></Rating> */}
              <div className="flex align-items-center gap-3">
                <Tag value={flor.estatus} severity={getSeverity(flor)}></Tag>
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{flor.categoria}</span>
                </span>
              </div>
              <span className="text-2xl font-semibold mt-8">${flor.precio}</span>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              {/* <span className="text-2xl font-semibold">${flor.precio}</span> */}
              <Button icon="pi pi-heart" rounded severity="help" aria-label="Favorite" className="my-5" />
              <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={flor.estatus === 'agotado'}></Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  //--> Modo de vista: grid
  const gridItem = (flor) => {
    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
        <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="flex align-items-center gap-2">
              <i className="pi pi-tag"></i>
              <span className="font-semibold">{flor.categoria}</span>
            </div>
            <Tag value={flor.estatus} severity={getSeverity(flor)}></Tag>
          </div>
          <div className="flex flex-column align-items-center gap-3 py-5">
            <img className="w-9 shadow-2 border-round" src={`https://media.admagazine.com/photos/61eb22cb9b19d943aa117b30/master/w_1600%2Cc_limit/Girasol.jpg`} alt="girasol" />
            <div className="text-2xl font-bold">{flor.nombre}</div>
            {/* <Rating value={flor.rating} readOnly cancel={false}></Rating> */}
          </div>
          <div className="flex align-items-center justify-content-between">
            <Button icon="pi pi-heart" rounded severity="help" aria-label="Favorite" className="mb-4" />
            <span className="text-2xl font-semibold">${flor.precio}</span>
            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={flor.estatus === 'no disponible'}></Button>
          </div>
        </div>
      </div>
    );
  };

  //--> Cambiar modo de vista
  const itemTemplate = (flor, layout) => {
    if (!flor) { return }

    if (layout === 'list') return listItem(flor);
    else if (layout === 'grid') return gridItem(flor);
  };

  //--> Barra para cambiar modo de vista
  const header = () => {
    return (
      <div className="flex justify-content-end">
        <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
      </div>
    );
  };

  return (
    <Layout
      title="Flores"
      description="Acceso al catalogo de flores"
    >
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <h5>Catalogo de flores</h5>
            <DataView value={flores} itemTemplate={itemTemplate} layout={layout} header={header()} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CatalogoFlores
