let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function mostrarCarrito() {
  const contenedor = document.getElementById("carrito-contenido");
  contenedor.innerHTML = "";

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    return;
  }

  carrito.forEach((producto, index) => {
    const div = document.createElement("div");
    div.classList.add("item-carrito");
    div.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}" width="100">
    <p><strong>${producto.nombre}</strong></p>
    <p>${producto.precio}</p>
    <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    contenedor.appendChild(div);
  });
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);
