CREATE DATABASE TalentoSinBarreras;
GO
USE TalentoSinBarreras;
GO

-- Tabla Rol
CREATE TABLE Rol (
    IDRol INT PRIMARY KEY NOT NULL,
    NombreRol VARCHAR(100) NOT NULL,
    PermisosAsociados TEXT NULL
);
GO

-- Tabla Usuario
CREATE TABLE Usuario (
    IDUsuario INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(150) NOT NULL,
    CorreoElectronico VARCHAR(150) UNIQUE NOT NULL,
    IDRol INT,
    FechaRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
    EstadoCuenta VARCHAR(20) NOT NULL DEFAULT 'activo' CHECK (EstadoCuenta IN ('activo', 'inactivo', 'suspendido')),
    FOREIGN KEY (IDRol) REFERENCES Rol(IDRol)
);
GO

-- Tabla de Contraseñas
CREATE TABLE Contrasenias (
    IDContrasenia INT IDENTITY(1,1) PRIMARY KEY,
    IDUsuario INT NOT NULL,
    ContrasenaHash VARCHAR(255) NOT NULL,
    Salt VARCHAR(255) NOT NULL,
    FechaCambio DATETIME DEFAULT CURRENT_TIMESTAMP,
    Activa BIT NOT NULL DEFAULT 1
    FOREIGN KEY (IDUsuario) REFERENCES Usuario(IDUsuario) ON DELETE CASCADE
);
GO

-- Tabla Ubicacion
CREATE TABLE Ubicacion (
    IDUbicacion INT PRIMARY KEY,
    Direccion VARCHAR(255),
    Ciudad VARCHAR(100),
    Estado VARCHAR(100),
    Pais VARCHAR(100),
    CoordenadasGeograficas VARCHAR(255) NULL
);
GO

-- Tabla Institucion
CREATE TABLE Institucion (
    IDInstitucion INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(150) NOT NULL,
    Tipo TEXT NOT NULL, -- Cambiar por enum para los tipos 
    Contacto VARCHAR(150),
    Direccion VARCHAR(255),
    RequisitosValidacion TEXT
);
GO

-- Tabla Tutor
CREATE TABLE Tutor (
    IDTutor INT IDENTITY(1,1) PRIMARY KEY,
    IDUsuario INT,
    IDVoluntario INT NULL,
    FechaNacimiento DATE,
    Nombre VARCHAR(150),
    FOREIGN KEY (IDUsuario) REFERENCES Usuario(IDUsuario)
);
GO

-- Tabla Voluntario
CREATE TABLE Voluntario (
    IDVoluntario INT IDENTITY(1,1) PRIMARY KEY,
    IDUsuario INT,
    IDTutor INT NULL,
    FechaNacimiento DATE,
    Nombre VARCHAR(150) NOT NULL,
    HorasAcumuladas INT NULL,
    InstitucionEducativa VARCHAR(150) NULL,
    FOREIGN KEY (IDUsuario) REFERENCES Usuario(IDUsuario),
    FOREIGN KEY (IDTutor) REFERENCES Tutor(IDTutor)
);
GO

-- Tabla Organizacion
CREATE TABLE Organizacion (
    IDOrganizacion INT IDENTITY(1,1) PRIMARY KEY,
    IDUsuario INT,
    NombreOrganizacion VARCHAR(150) NOT NULL,
    TipoOrganizacion VARCHAR(100),
    Responsable VARCHAR(150),
    Telefono VARCHAR(20),
    IDUbicacion INT,
    Estado VARCHAR(20) NOT NULL DEFAULT 'pendiente' CHECK (Estado IN ('pendiente', 'verificada', 'rechazada')),
    FOREIGN KEY (IDUsuario) REFERENCES Usuario(IDUsuario),
    FOREIGN KEY (IDUbicacion) REFERENCES Ubicacion(IDUbicacion)
);
GO

-- Tabla CategoriaCampaña
CREATE TABLE CategoriaCampania (
    IDCategoria INT PRIMARY KEY,
    NombreCategoria VARCHAR(100),
    Descripcion TEXT
);
GO

-- Tabla Campaña
CREATE TABLE Campania (
    IDCampania INT IDENTITY(1,1) PRIMARY KEY,
    IDOrganizacion INT,
    Nombre VARCHAR(150),
    Descripcion TEXT,
    FechaInicio DATE,
    FechaFin DATE,
    IDUbicacion INT,
    IDCategoria INT,
    CupoMaximo INT,
    Estado VARCHAR(20) NOT NULL DEFAULT 'abierta' CHECK (Estado IN ('abierta', 'cerrada')),
    FOREIGN KEY (IDOrganizacion) REFERENCES Organizacion(IDOrganizacion),
    FOREIGN KEY (IDUbicacion) REFERENCES Ubicacion(IDUbicacion),
    FOREIGN KEY (IDCategoria) REFERENCES CategoriaCampaña(IDCategoria)
);
GO

-- Tabla RegistroParticipacion
CREATE TABLE RegistroParticipacion (
    IDRegistro INT IDENTITY(1,1) PRIMARY KEY,
    IDVoluntario INT,
    IDCampania INT,
    FechaParticipacion DATE,
    HorasTrabajadas INT,
    Observaciones TEXT,
    FOREIGN KEY (IDVoluntario) REFERENCES Voluntario(IDVoluntario),
    FOREIGN KEY (IDCampania) REFERENCES Campania(IDCampania)
);
GO

-- Tabla CertificadoHoras
CREATE TABLE CertificadoHoras (
    IDCertificado INT PRIMARY KEY,
    IDRegistro INT,
    IDVoluntario INT,
    IDCampania INT,
    IDInstitucion INT,
    HorasTrabajadas INT,
    FechaEmision DATE,
    Estado VARCHAR(20) NOT NULL DEFAULT 'progreso' CHECK (Estado IN ('validado', 'no validado', 'progreso')),
    FOREIGN KEY (IDRegistro) REFERENCES RegistroParticipacion(IDRegistro),
    FOREIGN KEY (IDVoluntario) REFERENCES Voluntario(IDVoluntario),
    FOREIGN KEY (IDCampania) REFERENCES Campania(IDCampania),
    FOREIGN KEY (IDInstitucion) REFERENCES Institucion(IDInstitucion)
);
GO

-- Tabla de Tabulacion de Multas
CREATE TABLE TabulacionTiposMulta (
    IDTMultas INT IDENTITY(1,1) PRIMARY KEY,
    TipoMulta VARCHAR(150) NOT NULL,
    MontoBase DECIMAL(10,2) NULL,
    RequisitosLiquidarla TEXT,
    Descripcion TEXT NULL,
	Activa BIT NOT NULL DEFAULT 1
);
GO

-- Tabla Multa
CREATE TABLE Multa (
    IDMulta INT IDENTITY(1,1) PRIMARY KEY,
    IDVoluntario INT,
    Motivo TEXT,
    Monto DECIMAL(10,2),
    FechaEmision DATE,
    Estado VARCHAR(20) NOT NULL DEFAULT 'pendiente' CHECK (Estado IN ('pendiente', 'pagada', 'conmutada')),
	IDTipoMulta INT,
	FOREIGN KEY (IDTipoMulta) REFERENCES TabulacionTiposMulta(IDTMultas),
    FOREIGN KEY (IDVoluntario) REFERENCES Voluntario(IDVoluntario)
);
GO

-- Tabla Reseña
CREATE TABLE Resenia (
    IDResenia INT PRIMARY KEY,
    IDUsuario INT,
    TipoComentario VARCHAR(100),
    Contenido TEXT,
    Puntuacion INT CHECK (Puntuacion BETWEEN 1 AND 5),
    FechaPublicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (IDUsuario) REFERENCES Usuario(IDUsuario)
);
GO

-- Tabla Publicacion
CREATE TABLE Publicacion (
    IDPublicacion INT IDENTITY(1,1) PRIMARY KEY,
    IDOrganizacion INT,
    Titulo VARCHAR(150),
    Contenido TEXT,
    FechaPublicacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    ImagenAdjunta VARCHAR(255) NULL,
    FOREIGN KEY (IDOrganizacion) REFERENCES Organizacion(IDOrganizacion)
);
GO

-- Tabla Logro
CREATE TABLE Logro (
    IDLogro INT PRIMARY KEY,
    IDVoluntario INT,
    TipoLogro VARCHAR(100),
    FechaEntrega DATE,
    IDCampania INT,
    FOREIGN KEY (IDVoluntario) REFERENCES Voluntario(IDVoluntario),
    FOREIGN KEY (IDCampania) REFERENCES Campania(IDCampania)
);
GO

-- Tabla de Talleres
CREATE TABLE Talleres (
    IDTaller INT IDENTITY(1,1)PRIMARY KEY,
    Nombre VARCHAR(150) NOT NULL,
    Descripcion TEXT,
    FechaInicio DATE,
    FechaFin DATE,
    CupoMaximo INT,
    IDOrganizacion INT,
    IDUsuario INT,
	Estado VARCHAR(20) NOT NULL DEFAULT 'activo' CHECK (Estado IN ('activo', 'inactivo', 'cerrado')),
    FOREIGN KEY (IDOrganizacion) REFERENCES Organizacion(IDOrganizacion),
    FOREIGN KEY (IDUsuario) REFERENCES Usuario(IDUsuario)
);
GO
