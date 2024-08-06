function calculateEAN13CheckDigit(number) {
    let sum = 0;
    for (let i = 0; i < number.length; i++) {
        let digit = parseInt(number.charAt(i), 10);
        if (i % 2 === 0) {
            sum += digit;
        } else {
            sum += digit * 3;
        }
    }
    let remainder = sum % 10;
    return remainder === 0 ? 0 : 10 - remainder;
}

function generateBarcode() {
    // Obtener los valores ingresados por el usuario
    var country = document.getElementById('country').value;
    var company = document.getElementById('company').value;
    var item = document.getElementById('item').value;

    // Validar la longitud de cada campo
    if (country.length === 3 && company.length === 4 && item.length === 5) {
        // Construir el código de barras EAN13 sin dígito de verificación
        var baseBarcode = country + company + item;

        // Calcular el dígito de verificación
        var checkDigit = calculateEAN13CheckDigit(baseBarcode);
        var fullBarcode = baseBarcode + checkDigit;

        // Generar el código de barras
        JsBarcode("#barcode", fullBarcode, {
            format: "EAN13",
            lineColor: "#000000",
            width: 2,
            height: 100,
            displayValue: true,
            fontSize: 16,
            textAlign: "center",
            textPosition: "bottom"
        });

        // Mostrar el botón de descarga
        document.getElementById('downloadBtn').style.display = 'block';
    } else {
        // Ocultar el código de barras y el botón si los campos no están completos
        document.getElementById('barcode').innerHTML = '';
        document.getElementById('downloadBtn').style.display = 'none';
    }
}

// Agregar evento al botón de generación
document.getElementById('generateBtn').addEventListener('click', generateBarcode);

// Agregar evento al botón de descarga
document.getElementById('downloadBtn').addEventListener('click', function() {
    var svg = document.querySelector('#barcode');
    var serializer = new XMLSerializer();
    var source = serializer.serializeToString(svg);
    var url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
    
    var link = document.createElement('a');
    link.href = url;
    link.download = 'codigo_barras_ean13.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});