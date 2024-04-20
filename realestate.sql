-- membuat database
CREATE DATABASE realestate;

-- membuat table houses
CREATE TABLE houses (
    id BIGSERIAL PRIMARY KEY,
    address VARCHAR(255) NOT NULL,
    owner_name VARCHAR(225) NOT NULL,
    num_rooms INT NOT NULL,
    has_garden BOOLEAN
);

-- membuat data houses 
INSERT INTO houses (address, owner_name, num_rooms, has_garden) VALUES 
('Jl. Mekarwangi no.292, Bandung', 'Agus Setiawan', 10, true),
('RT 01 RW02, Desa Ateuk Pahlawan, Aceh', 'Ahmad Syauqi', 8, false),
('Jl. Mangga Dua Raya No. 10, Medan', 'Budi Prakerti', 20, true),
('Jl. Baros No. 17, Palembang', 'Edi Kuswanto', 19, false),
('Jl. Kenari No.100, Makassar', 'Dadang Nurjaman', 34, true),
('Perumahan Indah Melati Blok 7A No. 26, Yogyakarta', 'Entin Kusiasti', 83, false),
('Komplek Pasri Mulya B2 No. 10, Solo', 'Ivan Hamzah', 12, true),
('Jl. Banjaran no.29, Bandung', 'Regis Syawaludin Rifaldi', 18, false),
('Jl. Anggrek No. 12, Jakarta Barat', 'Titi Nurhamah', 54, true),
('Jl. Kampung Rambutan No. 21, Jakarta', 'Zauqi Ivandi', 17, false);

