import { Box, Button, colors, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch } from '@mui/material';
import React, { useState } from 'react';
import Map from './Map';
import { DescriptionOutlined, MapOutlined, MapRounded } from '@mui/icons-material';
import { ListRegistros } from './ListRegistros';

const registros = [
  {
    "registro_id": 1,
    "establecimiento_id": 2,
    "usuario_crea_id": 2,
    "usuario_edita_id": null,
    "estado_id": 1,
    "fecha_creacion": "2024-06-01T05:00:00.000Z",
    "fecha_actualizacion": null,
    "createdAt": "2024-07-11T21:08:25.000Z",
    "updatedAt": "2024-07-11T21:08:25.000Z",
    "Establecimiento": {
      "establecimiento_id": 1,
      "cliente_ruc": 123456781,
      "ubicacion": "Av. Los Olivos 123",
      "telefono": "123456789",
      "distrito_id": 1,
      "estado": true,
      "latitud": -12.099,
      "longitud": -77.039,
      "createdAt": "2024-07-11T21:08:25.000Z",
      "updatedAt": "2024-07-11T21:08:25.000Z",
      "Distrito": {
        "distrito_id": 1,
        "nombre": "Distrito 1",
        "createdAt": "2024-07-11T21:02:55.000Z",
        "updatedAt": "2024-07-11T21:02:55.000Z"
      }
    }
  },
  {
    "registro_id": 2,
    "establecimiento_id": 3,
    "usuario_crea_id": 2,
    "usuario_edita_id": null,
    "estado_id": 1,
    "fecha_creacion": "2024-06-01T05:00:00.000Z",
    "fecha_actualizacion": null,
    "createdAt": "2024-07-11T21:09:04.000Z",
    "updatedAt": "2024-07-11T21:09:04.000Z",
    "Establecimiento": {
      "establecimiento_id": 2,
      "cliente_ruc": 123456781,
      "ubicacion": "Jr. Los Sauces 456",
      "telefono": "987654321",
      "distrito_id": 1,
      "estado": true,
      "latitud": -12.088,
      "longitud": -77.026,
      "createdAt": "2024-07-11T21:08:30.000Z",
      "updatedAt": "2024-07-11T21:08:30.000Z",
      "Distrito": {
        "distrito_id": 1,
        "nombre": "Distrito 1",
        "createdAt": "2024-07-11T21:02:55.000Z",
        "updatedAt": "2024-07-11T21:02:55.000Z"
      }
    }
  },
  {
    "registro_id": 3,
    "establecimiento_id": 4,
    "usuario_crea_id": 2,
    "usuario_edita_id": null,
    "estado_id": 1,
    "fecha_creacion": "2024-06-01T05:00:00.000Z",
    "fecha_actualizacion": null,
    "createdAt": "2024-07-11T21:09:08.000Z",
    "updatedAt": "2024-07-11T21:09:08.000Z",
    "Establecimiento": {
      "establecimiento_id": 3,
      "cliente_ruc": 987654321,
      "ubicacion": "Calle Las Flores 789",
      "telefono": "234567890",
      "distrito_id": 2,
      "estado": true,
      "latitud": -12.095,
      "longitud": -77.045,
      "createdAt": "2024-07-12T21:07:20.000Z",
      "updatedAt": "2024-07-12T21:07:20.000Z",
      "Distrito": {
        "distrito_id": 2,
        "nombre": "Distrito 2",
        "createdAt": "2024-07-12T21:02:55.000Z",
        "updatedAt": "2024-07-12T21:02:55.000Z"
      }
    }
  }
];

const estados = [
  { id: 1, name: 'Por recoger' },
  { id: 2, name: 'Recogido' },
  { id: 3, name: 'Por contabilizar' },
  { id: 4, name: 'Por entregar' },
  { id: 5, name: 'Completo' },
];

export const RegistrosComponent = () => {

  const [viewAsCards, setViewAsCards] = useState(false);

  const [selectedDistrito, setSelectedDistrito] = useState('');
  const [selectedEstablecimiento, setSelectedEstablecimiento] = useState('');
  const [selectedEstado, setSelectedEstado] = useState('');

  const [showMap, setshowMap] = useState('flex');

  const distritos = [...new Set(registros.map(registro => registro.Establecimiento.Distrito.nombre))];
  const establecimientos = [...new Set(registros.map(registro => registro.Establecimiento.ubicacion))];


  const handleDistritoChange = (event) => {
    setSelectedDistrito(event.target.value);
  };

  const handleEstablecimientoChange = (event) => {
    setSelectedEstablecimiento(event.target.value);
  };
  
  const handleEstadoChange = (event) => {
    setSelectedEstado(event.target.value);
  };

  const filteredLocations = registros.filter(registro => {
    return (
      (selectedDistrito ? registro.Establecimiento.Distrito.nombre === selectedDistrito : true) &&
      (selectedEstablecimiento ? registro.Establecimiento.ubicacion === selectedEstablecimiento : true) &&
      (selectedEstado ? registro.estado_id === parseInt(selectedEstado) : true)
    );
  }).map(registro => ({
    lat: registro.Establecimiento.latitud,
    lng: registro.Establecimiento.longitud,
    name: registro.Establecimiento.ubicacion,
    telefono: registro.Establecimiento.telefono,
    address: registro.Establecimiento.ubicacion,
  }));

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', flex: 1}}>
      <Box sx={{ 
        display: 'block', 
        flex: 1, 
        flexDirection: 'column',
        position: 'fixed', 
        top: 10,
        left:{xs:viewAsCards=== true ? 50 : 15,sm:viewAsCards=== true ? 130 : 95,md:viewAsCards=== true ? 230 : 195}, 
        zIndex: 1000, 
        // backgroundColor: 'rgba(255, 255, 255, 1)' 
      }}>
        <FormControlLabel control={<Switch checked={viewAsCards} onChange={() => setViewAsCards(!viewAsCards)} />} label="Ver mapa" />
        
        <FormControl variant="outlined" sx={{ml:2, minWidth: 200 }}>
              <InputLabel id="distrito-label">Distrito</InputLabel>
              <Select
                labelId="distrito-label"
                value={selectedDistrito}
                onChange={handleDistritoChange}
                label="Distrito"
              >
                <MenuItem value="">
                  <em>Todos</em>
                </MenuItem>
                {distritos.map((distrito, index) => (
                  <MenuItem key={index} value={distrito}>
                    {distrito}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
      </Box>
        <Box sx={{ display: 'flex', flex: 1 }}>
          {viewAsCards ? (
            <Map locations={filteredLocations} />
            ):(
              <ListRegistros registros={registros}/>
            )
          }
        </Box>
      </Box>
      <Box sx={{ }}>
        <Box sx={{ display: 'none', flex: 1, flexDirection: 'column',position: 'fixed', top: 10, zIndex: 1000, backgroundColor: 'rgba(255, 255, 255, 1)' }}>
          <Box>
            <FormControl variant="outlined" sx={{ minWidth: 200 }}>
              <InputLabel id="distrito-label">Distrito</InputLabel>
              <Select
                labelId="distrito-label"
                value={selectedDistrito}
                onChange={handleDistritoChange}
                label="Distrito"
              >
                <MenuItem value="">
                  <em>Todos</em>
                </MenuItem>
                {distritos.map((distrito, index) => (
                  <MenuItem key={index} value={distrito}>
                    {distrito}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" sx={{ minWidth: 200 }}>
              <InputLabel id="estado-label">Estado</InputLabel>
              <Select
                labelId="estado-label"
                value={selectedEstado}
                onChange={handleEstadoChange}
                label="Estado"
              >
                <MenuItem value="">
                  <em>Todos</em>
                </MenuItem>
                {estados.map((estado, index) => (
                  <MenuItem key={index} value={estado.id}>
                    {estado.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

          </Box>
          <FormControl variant="outlined" sx={{ minWidth: 200 }}>
              <InputLabel id="establecimiento-label">Establecimiento</InputLabel>
              <Select
                labelId="establecimiento-label"
                value={selectedEstablecimiento}
                onChange={handleEstablecimientoChange}
                label="Establecimiento"
              >
                <MenuItem value="">
                  <em>Todos</em>
                </MenuItem>
                {establecimientos.map((establecimiento, index) => (
                  <MenuItem key={index} value={establecimiento}>
                    {establecimiento}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
        </Box>
      </Box>
      
    </React.Fragment>
    // <React.Fragment>
      // <Box sx={{ display: 'flex', flex: 1 }}>
      //   <Box sx={{ display: 'flex', flex: 1 }}>
      //     <Map locations={locations} />
      //   </Box>
      // </Box>
    // </React.Fragment>
  );
};
