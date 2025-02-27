import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  getProveedorActividades,
  getPaises,
  updateProveedor,
  fetchProveedorByName,
} from "../../lib/api_gateway";

export const EditProveedor = () => {
  // Se espera que la ruta incluya el parámetro "name"
  const { name } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Estado para controlar el envío y almacenar la data inicial
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialData, setInitialData] = useState(null);

  // Estado del formulario (campos requeridos por la API)
  const [formData, setFormData] = useState({
    nombre: "",
    actividad: "", // Se almacenará el ID de la actividad como string
    email: "",
    ruc: "",
    dv: "",
    ciudad: "",
    provincia: "",
    paisid: "", // Se almacenará el ID del país como string
    telefono: "",
    celular: "",
    contacto1: "",
    contacto2: "",
  });

  // Estados para los dropdowns
  const [actividades, setActividades] = useState([]);
  const [paises, setPaises] = useState([]);

  // Cargar datos de actividades y países al montar el componente
  useEffect(() => {
    fetchActividades();
    fetchPaises();
  }, []);

  const fetchActividades = async () => {
    try {
      const data = await getProveedorActividades();
      setActividades(data);
    } catch (error) {
      console.error("Error al obtener actividades:", error);
    }
  };

  const fetchPaises = async () => {
    try {
      const data = await getPaises();
      setPaises(data);
    } catch (error) {
      console.error("Error al obtener países:", error);
    }
  };

  // Función para mapear la data del proveedor al formato del formulario
  const mapProveedorData = (data) => ({
    nombre: data.nombre || "",
    actividad: data.actividadId ? String(data.actividadId) : "",
    email: data.email || "",
    ruc: data.ruc || "",
    dv: data.dv || "",
    ciudad: data.ciudad || "",
    provincia: data.provincia || "",
    paisid: data.paisid ? String(data.paisid) : "",
    telefono: data.telefono || "",
    celular: data.celular || "",
    contacto1: data.contacto1 || "",
    contacto2: data.contacto2 || "",
  });

  // Cargar la data del proveedor: se da preferencia a location.state y, si no existe, se consulta por nombre
  useEffect(() => {
    if (location.state) {
      const data = location.state;
      setInitialData(data);
      setFormData(mapProveedorData(data));
    } else {
      const loadProveedor = async () => {
        try {
          const data = await fetchProveedorByName(name);
          setInitialData(data);
          setFormData(mapProveedorData(data));
        } catch (error) {
          console.error("Error al cargar proveedor:", error);
        }
      };
      loadProveedor();
    }
  }, [name, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Si el campo es "contacto1" o "contacto2", eliminar caracteres numéricos
    if (name === "contacto1" || name === "contacto2") {
      const newValue = value.replace(/\d+/g, "");
      setFormData((prev) => ({ ...prev, [name]: newValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCancel = () => {
    navigate("/Administrar/Provaiders");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Construir el payload con la estructura requerida por la API
    const payload = {
      actividadId: Number(formData.actividad),
      ciudad: formData.ciudad,
      dv: formData.dv,
      email: formData.email,
      nombre: formData.nombre,
      paisid: Number(formData.paisid),
      provincia: formData.provincia,
      ruc: formData.ruc,
      telefono: formData.telefono,
      celular: formData.celular,
      contacto1: formData.contacto1,
      contacto2: formData.contacto2,
    };

    try {
      await updateProveedor(initialData.id, payload);
      toast({
        title: "Proveedor actualizado",
        description: "El proveedor ha sido actualizado exitosamente",
      });
      setTimeout(() => navigate("/Administrar/Provaiders"), 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto p-6 border border-zinc-700 rounded-md shadow-md mt-4 grid grid-cols-2 gap-6 bg-white"
    >
      {/* Sección Izquierda: Información general */}
      <div className="p-4 w-full">
        <h1 className="text-2xl font-bold mb-4">Información general</h1>

        <div className="mb-4">
          <Label htmlFor="nombre">Nombre*</Label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Nombre del proveedor"
            className="border-b border-zinc-300 p-2 w-full outline-none"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="actividad">Actividad*</Label>
          <select
            id="actividad"
            name="actividad"
            value={formData.actividad}
            onChange={handleChange}
            required
            className="bg-white text-black border-b border-zinc-300 p-2 w-full outline-none"
          >
            <option value="">Seleccione una actividad</option>
            {actividades.map((act) => (
              <option key={act.id} value={act.id}>
                {act.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <Label htmlFor="email">Correo electrónico*</Label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="correo@ejemplo.com"
            className="border-b border-zinc-300 p-2 w-full outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="ruc">RUC*</Label>
            <input
              id="ruc"
              name="ruc"
              type="text"
              value={formData.ruc}
              onChange={handleChange}
              required
              placeholder="RUC"
              className="border-b border-zinc-300 p-2 w-full outline-none"
            />
          </div>
          <div>
            <Label htmlFor="dv">DV*</Label>
            <input
              id="dv"
              name="dv"
              type="text"
              value={formData.dv}
              onChange={handleChange}
              required
              placeholder="DV"
              className="border-b border-zinc-300 p-2 w-full outline-none"
            />
          </div>
        </div>
      </div>

      {/* Sección Derecha: Detalles del proveedor */}
      <div className="p-4 w-full bg-black text-white rounded-md">
        <h2 className="text-lg font-semibold mb-4">Detalles del Proveedor</h2>

        <div className="mb-4">
          <Label htmlFor="paisid" className="text-white">
            País*
          </Label>
          <select
            id="paisid"
            name="paisid"
            value={formData.paisid}
            onChange={handleChange}
            required
            className="bg-black text-white border-b border-zinc-400 p-2 w-full outline-none"
          >
            <option value="">Seleccione un país</option>
            {paises.map((pais) => (
              <option key={pais.id} value={pais.id}>
                {pais.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <Label htmlFor="ciudad" className="text-white">
            Ciudad*
          </Label>
          <input
            id="ciudad"
            name="ciudad"
            type="text"
            value={formData.ciudad}
            onChange={handleChange}
            required
            placeholder="Ciudad"
            className="border-b border-zinc-400 p-2 w-full outline-none bg-transparent text-white"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="provincia" className="text-white">
            Provincia*
          </Label>
          <input
            id="provincia"
            name="provincia"
            type="text"
            value={formData.provincia}
            onChange={handleChange}
            required
            placeholder="Provincia"
            className="border-b border-zinc-400 p-2 w-full outline-none bg-transparent text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="telefono" className="text-white">
              Teléfono
            </Label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Teléfono"
              className="border-b border-zinc-400 p-2 w-full outline-none bg-transparent text-white"
            />
          </div>
          <div>
            <Label htmlFor="celular" className="text-white">
              Celular
            </Label>
            <input
              id="celular"
              name="celular"
              type="tel"
              value={formData.celular}
              onChange={handleChange}
              placeholder="Celular"
              className="border-b border-zinc-400 p-2 w-full outline-none bg-transparent text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="contacto1" className="text-white">
              Contacto 1
            </Label>
            <input
              id="contacto1"
              name="contacto1"
              type="text"
              value={formData.contacto1}
              onChange={handleChange}
              placeholder="Nombre de contacto 1"
              className="border-b border-zinc-400 p-2 w-full outline-none bg-transparent text-white"
            />
          </div>
          <div>
            <Label htmlFor="contacto2" className="text-white">
              Contacto 2
            </Label>
            <input
              id="contacto2"
              name="contacto2"
              type="text"
              value={formData.contacto2}
              onChange={handleChange}
              placeholder="Nombre de contacto 2"
              className="border-b border-zinc-400 p-2 w-full outline-none bg-transparent text-white"
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Button
            type="button"
            onClick={handleCancel}
            className="bg-gray-200 text-black hover:bg-gray-300"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-white text-black hover:bg-gray-200"
          >
            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>
      </div>
    </form>
  );
};
