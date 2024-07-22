import { Box, FormControl, InputLabel, MenuItem, Select, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import React, { useState, useEffect  } from 'react'
import FilterPanel from './FilterPanel'
import Map from './Map'
import { DialogToAdd } from './dialogs/DialogToAdd';


const data = [
  {
    "cliente_ruc": 123456781,
    "nombre": "Amazon",
    "usuario_id": 1,
    "estado": true,
    "createdAt": "2024-07-11T21:07:20.000Z",
    "updatedAt": "2024-07-11T21:07:20.000Z",
    "Establecimientos": [
      {
        "establecimiento_id": 1,
        "cliente_ruc": 123456781,
        "ubicacion": "Av. Los Olivos 123",
        "telefono": "123456789",
        "distrito_id": 1,
        "estado": true,
        "latitud": -12.099,
        "longitud": -77.039,
        "createdAt": "2024-07-11T21:07:20.000Z",
        "updatedAt": "2024-07-11T21:07:20.000Z",
        "Distrito": {
          "distrito_id": 1,
          "nombre": "Distrito 1",
          "createdAt": "2024-07-11T21:02:55.000Z",
          "updatedAt": "2024-07-11T21:02:55.000Z"
        }
      },
      {
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
    ]
  },
  {
    "cliente_ruc": 987654321,
    "nombre": "Google",
    "usuario_id": 2,
    "estado": true,
    "createdAt": "2024-07-12T21:07:20.000Z",
    "updatedAt": "2024-07-12T21:07:20.000Z",
    "Establecimientos": [
      {
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
      },
      {
        "establecimiento_id": 4,
        "cliente_ruc": 987654321,
        "ubicacion": "Av. Primavera 123",
        "telefono": "345678901",
        "distrito_id": 2,
        "estado": true,
        "latitud": -12.080,
        "longitud": -77.050,
        "createdAt": "2024-07-12T21:08:30.000Z",
        "updatedAt": "2024-07-12T21:08:30.000Z",
        "Distrito": {
          "distrito_id": 2,
          "nombre": "Distrito 2",
          "createdAt": "2024-07-12T21:02:55.000Z",
          "updatedAt": "2024-07-12T21:02:55.000Z"
        }
      }
    ]
  },
  {
    "cliente_ruc": 112233445,
    "nombre": "Microsoft",
    "usuario_id": 3,
    "estado": true,
    "createdAt": "2024-07-13T21:07:20.000Z",
    "updatedAt": "2024-07-13T21:07:20.000Z",
    "Establecimientos": [
      {
        "establecimiento_id": 5,
        "cliente_ruc": 112233445,
        "ubicacion": "Calle Las Orquídeas 456",
        "telefono": "456789012",
        "distrito_id": 3,
        "estado": true,
        "latitud": -12.105,
        "longitud": -77.060,
        "createdAt": "2024-07-13T21:07:20.000Z",
        "updatedAt": "2024-07-13T21:07:20.000Z",
        "Distrito": {
          "distrito_id": 3,
          "nombre": "Distrito 3",
          "createdAt": "2024-07-13T21:02:55.000Z",
          "updatedAt": "2024-07-13T21:02:55.000Z"
        }
      },
      {
        "establecimiento_id": 6,
        "cliente_ruc": 112233445,
        "ubicacion": "Av. Los Tulipanes 789",
        "telefono": "567890123",
        "distrito_id": 3,
        "estado": true,
        "latitud": -12.115,
        "longitud": -77.070,
        "createdAt": "2024-07-13T21:08:30.000Z",
        "updatedAt": "2024-07-13T21:08:30.000Z",
        "Distrito": {
          "distrito_id": 3,
          "nombre": "Distrito 3",
          "createdAt": "2024-07-13T21:02:55.000Z",
          "updatedAt": "2024-07-13T21:02:55.000Z"
        }
      }
    ]
  },
  {
    "cliente_ruc": 556677889,
    "nombre": "Apple",
    "usuario_id": 4,
    "estado": true,
    "createdAt": "2024-07-14T21:07:20.000Z",
    "updatedAt": "2024-07-14T21:07:20.000Z",
    "Establecimientos": [
      {
        "establecimiento_id": 7,
        "cliente_ruc": 556677889,
        "ubicacion": "Calle Los Rosales 123",
        "telefono": "678901234",
        "distrito_id": 4,
        "estado": true,
        "latitud": -12.120,
        "longitud": -77.080,
        "createdAt": "2024-07-14T21:07:20.000Z",
        "updatedAt": "2024-07-14T21:07:20.000Z",
        "Distrito": {
          "distrito_id": 4,
          "nombre": "Distrito 4",
          "createdAt": "2024-07-14T21:02:55.000Z",
          "updatedAt": "2024-07-14T21:02:55.000Z"
        }
      },
      {
        "establecimiento_id": 8,
        "cliente_ruc": 556677889,
        "ubicacion": "Jr. Los Cedros 456",
        "telefono": "789012345",
        "distrito_id": 4,
        "estado": true,
        "latitud": -12.130,
        "longitud": -77.090,
        "createdAt": "2024-07-14T21:08:30.000Z",
        "updatedAt": "2024-07-14T21:08:30.000Z",
        "Distrito": {
          "distrito_id": 4,
          "nombre": "Distrito 4",
          "createdAt": "2024-07-14T21:02:55.000Z",
          "updatedAt": "2024-07-14T21:02:55.000Z"
        }
      }
    ]
  }
];


export const EmpresasComponent = () => {
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [selectedEstablecimiento, setSelectedEstablecimiento] = useState(null);
  const [selectedEmpresaOption, setSelectedEmpresaOption] = useState('');
  const [selectedEstablecimientoOption, setSelectedEstablecimientoOption] = useState('');

  const opt = {
    title : '',
    opt: 1
  }

  const [showDialogAdd, setShowDialogAdd] = useState(false);
  const [optionsDialog, setOptionsDialog] = useState(opt)

  useEffect(() => {
    if (selectedEmpresa) {
      setSelectedEmpresaOption(selectedEmpresa.cliente_ruc);
      setSelectedEstablecimientoOption('Todos');
    } else {
      setSelectedEmpresaOption('');
      setSelectedEstablecimientoOption('');
    }
  }, [selectedEmpresa]);

  useEffect(() => {
    if (selectedEstablecimiento) {
      setSelectedEstablecimientoOption(selectedEstablecimiento.establecimiento_id);
    } else {
      setSelectedEstablecimientoOption('Todos');
    }
  }, [selectedEstablecimiento]);

  const handleEmpresaSelect = (empresa) => {
    setSelectedEmpresa(empresa);
    setSelectedEstablecimiento(null);
  };

  const handleEstablecimientoSelect = (establecimiento) => {
    setSelectedEstablecimiento(establecimiento);
  };

  const handleOptionChange = (event) => {
    const selectedClienteRuc = event.target.value;
    const selectedCliente = data.find(cliente => cliente.cliente_ruc === selectedClienteRuc);
    handleEmpresaSelect(selectedCliente);
  };

  const handleEstablecimientoOptionChange = (event) => {
    const selectedEstablecimientoId = event.target.value;
    if (selectedEstablecimientoId === 'Todos') {
      setSelectedEstablecimiento(null);
    } else {
      const selectedEstablecimiento = selectedEmpresa.Establecimientos.find(establecimiento => establecimiento.establecimiento_id === selectedEstablecimientoId);
      handleEstablecimientoSelect(selectedEstablecimiento);
    }
  };

  const handleShowDialogOpen = (title,option) =>{
    setOptionsDialog({
      title,
      option
    });
    setShowDialogAdd(true);
  };
  const handleShowDialogClose = () =>{
    setOptionsDialog(opt);
    setShowDialogAdd(false);
  };

  let locations = [];
  if (selectedEmpresa) {
    locations = selectedEmpresa.Establecimientos.map(establecimiento => ({
      lat: establecimiento.latitud,
      lng: establecimiento.longitud,
      name: establecimiento.ubicacion,
      address: `${establecimiento.Distrito.nombre}`,
    }));
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Box sx={{ display: { xs: 'block', md: 'block' } }}>
          <Box>
            <FilterPanel title='Empresas' data={data} onItemSelect={handleEmpresaSelect} option={1}/>
          </Box>
          {selectedEmpresa && (
            <Box>
              {/* <FilterPanel title='Establecimientos' data={selectedEmpresa.Establecimientos} onItemSelect={handleEstablecimientoSelect} endComponent={true} option={2}/> */}
            </Box>
          )}
        </Box>
        <Box sx={{ display: 'flex', flex: 1 }}>
          <Map locations={locations} selectedEstablecimiento={selectedEstablecimiento} />
        </Box>
      </Box>
      <Box sx={{ position: 'fixed', top: 10, right: 16, zIndex: 1000, backgroundColor: 'rgba(255, 255, 255, 1)' }}>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <Select labelId="select-floating-label" value={selectedEmpresaOption} onChange={handleOptionChange}>
            {data.map((cliente) => (
              <MenuItem key={cliente.cliente_ruc} value={cliente.cliente_ruc}>
                {cliente.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {selectedEmpresa && (
        <Box sx={{ position: 'fixed', top: 70, right: 16, zIndex: 1001, backgroundColor: 'rgba(255, 255, 255, 1)' }}>
          <FormControl variant="outlined" sx={{ minWidth: 120 }}>
            <Select labelId="select-floating-label" value={selectedEstablecimientoOption} onChange={handleEstablecimientoOptionChange}>
              <MenuItem value="Todos">
                <em>Todos</em>
              </MenuItem>
              {selectedEmpresa.Establecimientos.map((establecimiento) => (
                <MenuItem key={establecimiento.establecimiento_id} value={establecimiento.establecimiento_id}>
                  {establecimiento.ubicacion}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
      <Box sx={{ position: 'absolute', bottom: 16, right: 16, zIndex: 1000 }}>
        <SpeedDial
          ariaLabel="options"
          icon={<SpeedDialIcon />}
          sx={{ color: 'white' }}
        >
          <SpeedDialAction
            icon={<SpeedDialIcon />}
            tooltipTitle="Agregar Empresa"
            tooltipOpen={true}
            onClick={() => handleShowDialogOpen("Agregar empresa",1)}
          />
          <SpeedDialAction
            icon={<SpeedDialIcon />}
            tooltipTitle="Agregar Establecimiento"
            tooltipOpen={true}
            onClick={() => handleShowDialogOpen("Agregar establecimiento",2)}
          />
        </SpeedDial>
      </Box>
      <DialogToAdd open={showDialogAdd} onClose={handleShowDialogClose} title={optionsDialog.title || ''} options={optionsDialog}/>
    </React.Fragment>
  );
};