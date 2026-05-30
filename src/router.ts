import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { handleInputErrors } from './middleware'

const router = Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product Name
 *                      example: Raton Gaming LG
 *                  price:
 *                      type: number
 *                      description: The Product Price
 *                      example: 250
 *                  availability:
 *                      type: boolean
 *                      description: The Product Availability
 *                      example: true
 * 
 */

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
    param('id')
        .isInt().withMessage('ID no válido'),
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

router.patch('/:id',
    param('id')
        .isInt().withMessage('ID no válido'),
    handleInputErrors,

    updateAvailability
)

router.delete('/:id', 
    param('id')
        .isInt().withMessage('ID no válido'),
    handleInputErrors,

    deleteProduct
)

export default router