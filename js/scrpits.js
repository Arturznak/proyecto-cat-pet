let productos = [
  {
    id: 1,
    nombre: "Virbac Preventdog Collar",
    precio: "19.99€ - 27.49€",
    imagen: "../Fotos/higiene_perro_antiparasitarios.png",
    descripcion: "Collar antiparasitario para perros. Protección prolongada contra pulgas y garrapatas."
  },
  {
    id: 2,
    nombre: "Seresto Collar",
    precio: "36.49€ - 38.99€",
    imagen: "../Fotos/antiparasitarios_perro.png",
    descripcion: "Collar antiparasitario de larga duración para perros y gatos."
  },
  {
    id: 3,
    nombre: "Vitakraft Snack Salmón",
    precio: "2.29€ - 12.99€",
    imagen: "../Fotos/snack_gato.png",
    descripcion: "Snack líquido de salmón para gatos."
  },
  {
    id: 4,
    nombre: "Tootoy Pelota de tenis",
    precio: "1.49€",
    imagen: "../Fotos/pelota.png",
    descripcion: "Pelota para gatos con textura suave y rebote divertido."
  }
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  carrito.push(producto);
  localStorage.setItem('carrito', JSON.stringify(carrito));
}


function mostrarProductos() {
  const contenedor = document.getElementById('listaProductos');
  contenedor.innerHTML = '';
  productos.forEach(p => {
    const div = document.createElement('div');
    div.className = 'producto';
    div.innerHTML = `
    <img src="${p.imagen}" alt="${p.nombre}">
    <h3>${p.nombre}</h3>
    <p>${p.precio}</p>
    <div class="acciones">
        <button onclick="verProducto(${p.id})">Ver</button>
        <button onclick="agregarAlCarrito(${p.id})">Añadir al carrito</button>
    </div>
    `;
    contenedor.appendChild(div);
  });
}

function verProducto(id) {
  const producto = productos.find(p => p.id === id);
  const div = document.getElementById('detalleProducto');
  div.innerHTML = `
    <h3>${producto.nombre}</h3>
    <img src="${producto.imagen}" alt="${producto.nombre}" width="200">
    <p><strong>Precio:</strong> ${producto.precio}</p>
    <p><strong>Descripción:</strong> ${producto.descripcion}</p>
  `;
  div.style.display = 'block';
}

mostrarProductos();
