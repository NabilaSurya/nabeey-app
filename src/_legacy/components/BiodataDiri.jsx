import React, { useState } from 'react';
import Nama from './Nama';
import Umur from './Umur';
import Alamat from './Alamat';
import Hobi from './Hobi';
import Pendidikan from './Pendidikan';
import Kontak from './Kontak';
import '../custom.css';
import profile from '../assets/profile.jpg';

export default function BiodataDiri() {
  // State untuk menentukan konten mana yang aktif
  const [activeSection, setActiveSection] = useState('menu');

  // Fungsi untuk kembali ke menu utama
  const goBack = () => setActiveSection('menu');

  return (
    <div className="container">
      <div className={`card ${activeSection !== 'menu' ? 'is-detail' : ''}`}>
        
        {/* Tombol Back - Hanya muncul di halaman detail */}
        {activeSection !== 'menu' && (
          <button className="back-btn" onClick={goBack}>
            ← Kembali
          </button>
        )}

        <img src={profile} alt="profile" className="profile" />
        
        {/* Judul dinamis sesuai section */}
        <h1>{activeSection === 'menu' ? 'My Portfolio' : activeSection.toUpperCase()}</h1>

        <div className="data-container">
          {activeSection === 'menu' ? (
            /* Tampilan Menu Utama */
            <div className="menu-list">
              <button onClick={() => setActiveSection('nama')} className="menu-item">Nama Saya</button>
              <button onClick={() => setActiveSection('umur')} className="menu-item">Umur</button>
              <button onClick={() => setActiveSection('alamat')} className="menu-item">Alamat</button>
              <button onClick={() => setActiveSection('hobi')} className="menu-item">Hobi</button>
              <button onClick={() => setActiveSection('pendidikan')} className="menu-item">Pendidikan</button>
              <button onClick={() => setActiveSection('kontak')} className="menu-item">Kontak</button>
            </div>
          ) : (
            /* Tampilan Detail (Komponen yang kamu buat) */
            <div className="detail-view">
              {activeSection === 'nama' && <Nama />}
              {activeSection === 'umur' && <Umur />}
              {activeSection === 'alamat' && <Alamat />}
              {activeSection === 'hobi' && <Hobi />}
              {activeSection === 'pendidikan' && <Pendidikan />}
              {activeSection === 'kontak' && <Kontak />}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}