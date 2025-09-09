'use client';

import React from 'react';

interface LocationPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (location: string) => void;
  selectedLocation: string;
}

export default function LocationPicker({ isOpen, onClose, onSelect, selectedLocation }: LocationPickerProps) {
  // Major cities of Uzbekistan
  const majorCities = [
    'Tashkent', 'Samarkand', 'Bukhara', 'Namangan', 'Andijan',
    'Nukus', 'Qarshi', 'Kokand', 'Margilan', 'Fergana',
    'Jizzakh', 'Urgench', 'Gulistan', 'Termez'
  ];

  // Districts and regions organized alphabetically
  const locationsByLetter = {
    'A': ['Angren', 'Asaka', 'Almalyk', 'Altiarik', 'Akdarya'],
    'B': ['Beshariq', 'Buka', 'Bogot', 'Boyovut', 'Bulungur'],
    'C': ['Chust', 'Chirchiq', 'Chinoz', 'Chortoq', 'Chiroqchi'],
    'D': ['Denov', 'Dustlik', 'Davlatabad', 'Dehqonabad'],
    'F': ['Fargona', 'Furkat', 'Forish'],
    'G': ['Guliston', 'Gazalkent', 'Gijduvan', 'Gurlan'],
    'H': ['Hazorasp', 'Hovos', 'Hilol'],
    'I': ['Ishtixon', 'Ishtikhon'],
    'J': ['Jizzax', 'Jalaquduq', 'Jomboy'],
    'K': ['Koson', 'Kitob', 'Kattaqorgan', 'Kosonsoy', 'Kuvasoy'],
    'L': ['Lomish', 'Latif'],
    'M': ['Muborak', 'Mingbulaq', 'Muynak', 'Mirishkor'],
    'N': ['Navoiy', 'Nurota', 'Narpay', 'Nukus'],
    'O': ['Oltinko\'l', 'Oqqo\'rgan', 'Oltinsoy'],
    'P': ['Pop', 'Pastdargom', 'Pakhtakor'],
    'Q': ['Qashqadaryo', 'Qo\'qon', 'Quva', 'Qo\'rghontepa'],
    'R': ['Rishton', 'Romitan'],
    'S': ['Sirdaryo', 'Shofirkon', 'Sariosiyo'],
    'T': ['Turakurgan', 'Tozeur', 'Tuytepa'],
    'U': ['Uchkurgan', 'Uychi', 'Uchtepa'],
    'V': ['Vobkent', 'Vahdat'],
    'Y': ['Yangibozor', 'Yangiobod', 'Yangikurgan'],
    'Z': ['Zarafshan', 'Zarbdor', 'Zarkent']
  };

  const handleLocationSelect = (location: string) => {
    onSelect(location);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '2rem',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '2px solid #e9ecef'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            fontWeight: '600',
            color: '#333',
            margin: 0
          }}>
            📍 Choose Location
          </h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              color: '#666',
              cursor: 'pointer',
              padding: '0.25rem',
              borderRadius: '50%',
              width: '35px',
              height: '35px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = '#f8f9fa';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.backgroundColor = 'transparent';
            }}
          >
            ×
          </button>
        </div>

        {/* Major Cities Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            color: '#333',
            marginBottom: '1rem'
          }}>
            🏙️ Major Cities
          </h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '0.5rem'
          }}>
            {majorCities.map((city) => (
              <button
                key={city}
                onClick={() => handleLocationSelect(city)}
                style={{
                  padding: '0.75rem',
                  border: selectedLocation === city ? '2px solid #007bff' : '2px solid #e9ecef',
                  borderRadius: '8px',
                  backgroundColor: selectedLocation === city ? '#e3f2fd' : 'white',
                  color: '#333',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLButtonElement;
                  target.style.backgroundColor = '#e3f2fd';
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLButtonElement;
                  target.style.backgroundColor = selectedLocation === city ? '#e3f2fd' : 'white';
                }}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Districts Section */}
        <div>
          <h4 style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            color: '#333',
            marginBottom: '1rem'
          }}>
            🗺️ Districts & Regions
          </h4>
          {Object.entries(locationsByLetter).map(([letter, locations]) => (
            <div key={letter} style={{ marginBottom: '1rem' }}>
              <div style={{
                fontSize: '0.9rem',
                fontWeight: '600',
                color: '#666',
                marginBottom: '0.5rem',
                padding: '0.25rem 0.5rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px',
                display: 'inline-block'
              }}>
                {letter}
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                gap: '0.25rem',
                marginLeft: '1rem'
              }}>
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => handleLocationSelect(location)}
                    style={{
                      padding: '0.5rem',
                      border: selectedLocation === location ? '2px solid #007bff' : '1px solid #e9ecef',
                      borderRadius: '6px',
                      backgroundColor: selectedLocation === location ? '#e3f2fd' : 'white',
                      color: '#333',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => {
                      const target = e.target as HTMLButtonElement;
                      target.style.backgroundColor = '#e3f2fd';
                    }}
                    onMouseLeave={(e) => {
                      const target = e.target as HTMLButtonElement;
                      target.style.backgroundColor = selectedLocation === location ? '#e3f2fd' : 'transparent';
                    }}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
