const express=require('express');
const router=express.Router();
const homeController=require('../controller/home_controller');
const multer=require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uplodes')
    },
    filename: function (req, file, cb) {
      cb(null,Date.now()+file.originalname);
    }
  })
  
const upload = multer({ storage: storage })


router.get('/',homeController.home);
router.post('/sendCsv',upload.single('csv'),homeController.sendCsv);
router.get('/delet/:id',homeController.removeCsv);
router.get('/view/:id',homeController.viewcsv);



module.exports=router;