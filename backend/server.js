import jsonServer from 'json-server'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 3001
const IMG_DIR = path.join(__dirname, 'images')

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    fs.mkdirSync(IMG_DIR, { recursive: true })
    cb(null, IMG_DIR)
  },
  filename: (_req, file, cb) => {
    cb(null, path.basename(file.originalname))
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    cb(null, file.mimetype.startsWith('image/'))
  },
})

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.jsonc'))
const middlewares = jsonServer.defaults()

router.db._.id = 'vin'

server.use(middlewares)

// Serve car images from /api/images/<filename>
server.get('/api/images/:file', (req, res) => {
  const filePath = path.join(__dirname, 'images', req.params.file)
  if (!fs.existsSync(filePath)) {
    return res.sendStatus(404)
  }
  res.sendFile(filePath)
})

// Upload a car image to /api/images (multipart/form-data, field name "image")
server.post('/api/images', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'An image file is required (field name "image")' })
  }

  res.status(201).json({
    fileName: req.file.filename,
    url: `/api/images/${req.file.filename}`,
  })
})

server.get('/api/cars/search', (req, res) => {
    let cars = router.db.get('cars').value()
    const { manufacturer, model, fuelType, gearbox, priceMin, priceMax, yearMin, yearMax, _sort, _order, _page, _limit } = req.query

    if (manufacturer) cars = cars.filter(c => c.manufacturer.toLowerCase().includes(manufacturer.toLowerCase()))
    if (model) cars = cars.filter(c => c.model.toLowerCase().includes(model.toLowerCase()))
    if (fuelType) cars = cars.filter(c => c.fuelType.toLowerCase().includes(fuelType.toLowerCase()))
    if (gearbox) cars = cars.filter(c => c.gearbox.toLowerCase().includes(gearbox.toLowerCase()))
    if (priceMin) cars = cars.filter(c => c.price >= Number(priceMin))
    if (priceMax) cars = cars.filter(c => c.price <= Number(priceMax))
    if (yearMin) cars = cars.filter(c => c.constructionYear >= Number(yearMin))
    if (yearMax) cars = cars.filter(c => c.constructionYear <= Number(yearMax))

    if (_sort) {
        const ord = _order === 'desc' ? -1 : 1
        cars = [...cars].sort((a, b) => (a[_sort] < b[_sort] ? -1 : a[_sort] > b[_sort] ? 1 : 0) * ord)
    }

    const total = cars.length
    const page = _page ? Number(_page) : undefined
    const limit = _limit ? Number(_limit) : undefined
    const items = page && limit ? cars.slice((page - 1) * limit, page * limit) : cars
    const totalPages = limit && limit > 0 ? Math.max(1, Math.ceil(total / limit)) : 1

    res.json({ items, total, page, limit, totalPages })
})

server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  })
)

server.use(router)

server.listen(PORT, () => {
  console.log(`JSON Server running on http://localhost:${PORT}`)
})
