import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getProveedores, getProveedorActividades, getPaises, deleteProveedor } from "../lib/api_gateway";
import { Edit, Trash2 } from "lucide-react";

export default function ProvidersPage() {
  const [proveedores, setProveedores] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [paises, setPaises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const [dataProveedores, dataActividades, dataPaises] = await Promise.all([
        getProveedores(),
        getProveedorActividades(),
        getPaises(),
      ]);
      setProveedores(dataProveedores);
      setActividades(dataActividades);
      setPaises(dataPaises);
    }
    fetchData();
  }, []);

  // Funciones para obtener el nombre de la actividad y del país
  const getNombreActividad = (actividadId) => {
    const actividad = actividades.find((a) => a.id === actividadId);
    return actividad ? actividad.nombre : actividadId;
  };

  const getNombrePais = (paisId) => {
    const pais = paises.find((p) => p.id === paisId);
    return pais ? pais.nombre : paisId;
  };

  // Lógica de paginación
  const totalPages = Math.ceil(proveedores.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProveedores = proveedores.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          onClick={() => handlePageChange(i)}
          className="mx-1"
        >
          {i}
        </Button>
      );
    }
    return pages;
  };

  const handleAgregarProveedor = () => {
    navigate("/Administrar/Provaiders/add");
  };

  // Función para redirigir a la edición con el proveedor seleccionado
  const handleEdit = (provider) => {
    navigate("/Administrar/Provaiders/edit", { state: provider });
  };

  // Función para eliminar un proveedor
  const handleDelete = async (provider) => {
    if (window.confirm(`¿Estás seguro que deseas eliminar a ${provider.nombre}?`)) {
      try {
        await deleteProveedor(provider.nombre);
        // Actualiza el estado eliminando el proveedor borrado
        setProveedores(prev => prev.filter(p => p.id !== provider.id));
      } catch (error) {
        console.error("Error al eliminar el proveedor", error);
        alert("No se pudo eliminar el proveedor.");
      }
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lista de Proveedores</h1>
        <Button variant="default" onClick={handleAgregarProveedor}>
          + Agregar Proveedor
        </Button>
      </div>
      <div className="w-full max-w-4xl mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Nombre</TableHead>
              <TableHead className="text-center">Actividad</TableHead>
              <TableHead className="text-center">Pais</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Telefono</TableHead>
              <TableHead className="text-center">Contacto</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProveedores.map((prov) => (
              <TableRow key={prov.id}>
                <TableCell>{prov.nombre}</TableCell>
                <TableCell className="text-center">{getNombreActividad(prov.actividadId)}</TableCell>
                <TableCell className="text-center">{getNombrePais(prov.paisid)}</TableCell>
                <TableCell className="text-center">{prov.email}</TableCell>
                <TableCell className="text-center">{prov.telefono}</TableCell>
                <TableCell className="text-center">{prov.contacto1}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="mr-2" onClick={() => handleEdit(prov)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(prov)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {totalPages > 1 && (
        <div className="mt-4">
          {renderPageNumbers()}
        </div>
      )}
    </div>
  );
}
