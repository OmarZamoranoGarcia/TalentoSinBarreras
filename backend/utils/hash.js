import bcrypt from 'bcrypt';

export async function generarHash(contrasena) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(contrasena, salt);
  return { hash, salt };
}

export async function verificarContrasena(contrasenaIngresada, hashGuardado) {
  return await bcrypt.compare(contrasenaIngresada, hashGuardado);
}
