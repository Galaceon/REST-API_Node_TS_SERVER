import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, getProductById, getProducts, updateProduct } from './handlers/product'
import { handleInputErrors } from './middleware'

const router = Router()

//Routing
router.get('/', getProducts)
router.get('/:id', 
    // Validación
    param('id')
        .isInt().withMessage('ID no válido'),

    handleInputErrors,

    getProductById
)

router.post('/', 
    // Validación 
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no Valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no valido'),

    handleInputErrors,

    createProduct
)

router.put('/:id', 
    
    // Validación 
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacio'),
    body('price')
        .isNumeric().withMessage('Valor no Valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no valido'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no válido'),

    handleInputErrors,

    updateProduct
)

router.patch('/', (req, res) => {

    res.json('Desde Patch')
})

router.delete('/', (req, res) => {

    res.json('Desde Delete')
})

export default router