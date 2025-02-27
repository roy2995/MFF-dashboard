import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getProveedores,
  getProveedorActividades,
  getPaises,
  deleteProveedor,
} from "../lib/api_gateway";
import { Edit, Trash2, Eye, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

export default function ProvidersPage() {
  const [proveedores, setProveedores] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [paises, setPaises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProveedor, setSelectedProveedor] = useState(null);

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

  // Obtener nombre de la actividad
  const getNombreActividad = (actividadId) => {
    const actividad = actividades.find((a) => a.id === actividadId);
    return actividad ? actividad.nombre : actividadId;
  };

  // Obtener nombre del país
  const getNombrePais = (paisId) => {
    const pais = paises.find((p) => p.id === paisId);
    return pais ? pais.nombre : paisId;
  };

  // Paginación
  const totalPages = Math.ceil(proveedores.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProveedores = proveedores.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAgregarProveedor = () => {
    navigate("/Administrar/Provaiders/add");
  };

  const handleEdit = (provider) => {
    navigate("/Administrar/Provaiders/edit", { state: provider });
  };

  const handleDelete = async (provider) => {
    if (window.confirm(`¿Estás seguro que deseas eliminar a ${provider.nombre}?`)) {
      try {
        await deleteProveedor(provider.nombre);
        setProveedores((prev) => prev.filter((p) => p.id !== provider.id));
      } catch (error) {
        console.error("Error al eliminar el proveedor", error);
        alert("No se pudo eliminar el proveedor.");
      }
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      {/* Encabezado */}
      <div className="w-full max-w-4xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lista de Proveedores</h1>
        <Button variant="default" onClick={handleAgregarProveedor}>
          + Agregar Proveedor
        </Button>
      </div>

      {/* Tabla de proveedores */}
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
                <TableCell className="text-center">
                  {getNombreActividad(prov.actividadId)}
                </TableCell>
                <TableCell className="text-center">
                  {getNombrePais(prov.paisid)}
                </TableCell>
                <TableCell className="text-center">{prov.email}</TableCell>
                <TableCell className="text-center">{prov.telefono}</TableCell>
                <TableCell className="text-center">{prov.contacto1}</TableCell>
                <TableCell className="text-right">
                  {/* Botón para ver detalles (modal) */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2"
                    onClick={() => setSelectedProveedor(prov)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  {/* Botón para editar */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mr-2"
                    onClick={() => handleEdit(prov)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>

                  {/* Botón para eliminar */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(prov)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="mt-4 flex">
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => handlePageChange(i + 1)}
              className="mx-1"
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}

      {/* Modal con los detalles del proveedor */}
      <Dialog
        open={!!selectedProveedor}
        onOpenChange={() => setSelectedProveedor(null)}
      >
        <DialogContent className="p-0 max-w-xl">
          {/* Encabezado estilo negro */}
          <div className="flex items-center justify-between bg-black px-4 py-2">
            <h2 className="text-white font-bold">
              {`${selectedProveedor?.nombre || ""}`}
            </h2>
            <button
              className="text-red-500"
              onClick={() => setSelectedProveedor(null)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cuerpo en blanco con la información en dos columnas */}
          <div className="bg-white p-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Fila 1 */}
              <div>
                <strong>Actividad:</strong>{" "}
                {getNombreActividad(selectedProveedor?.actividadId)}
              </div>
              <div>
                <strong>Correo electrónico:</strong>{" "}
                {selectedProveedor?.email}
              </div>

              {/* Fila 2 */}
              <div>
                <strong>País:</strong> {getNombrePais(selectedProveedor?.paisid)}
              </div>
              <div>
                {/* RUC y DV en la misma línea */}
                <strong>RUC:</strong> {selectedProveedor?.ruc || ""}
                {"  "}
                <strong>DV:</strong> {selectedProveedor?.dv || ""}
              </div>

              {/* Fila 3 */}
              <div>
                <strong>Teléfono de Contacto:</strong>{" "}
                {selectedProveedor?.telefono}
              </div>
              <div>
                <strong>Celular de Contacto:</strong>{" "}
                {selectedProveedor?.celular}
              </div>

              {/* Fila 4 */}
              <div>
                <strong>Nombre de Contacto 1:</strong>{" "}
                {selectedProveedor?.contacto1}
              </div>
              <div>
                <strong>Nombre de Contacto 2:</strong>{" "}
                {selectedProveedor?.contacto2}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
