const express = require('express');
const router = express.Router();





const pool = require('../database');
router.get('/add', (req,res) =>{
    res.render('links/add');
});
router.get('/registro', (req,res) =>{
    res.render('links/registro');
});
router.get('/login', (req,res) =>{
    res.render('links/login');
});


router.get('/confprueba', (req,res) =>{
    res.render('links/confprueba');
});

router.get('/respd', async (req,res) =>{
    const lpru = await pool.query('SELECT * FROM prueba');
    console.log(lpru);

    const lres = await pool.query('SELECT * FROM resprueba');
    console.log(lres);
    res.render('links/ResUser', { lpru, lres })
    
});

router.post('/registro', async (req,res) =>{
    console.log(req.body);
    const {nombre, apellido, correo, clave, clavef,  edad, peso, altura, telefono, rol} = req.body;
    const newUser= {
         nombre,
          apellido, 
          correo,
           clave, 
           clavef,  
           edad, 
           peso,
            altura, 
            telefono, 
            rol
    };

    console.log(newUser);
    await pool.query('INSERT INTO user set ?', [newUser]);
    res.render('links/login');
});


router.post('/respd', async (req,res) =>{
    console.log(req.body);
    const {nomPrueba, vel, tiempo, vuelta} = req.body;
    const nomResPrueba= {
        nomPrueba,
        vel, 
        tiempo,
        vuelta
    };

    console.log(nomResPrueba);
    await pool.query('INSERT INTO resprueba set ?', [nomResPrueba]);
    res.render('links/ResUser');
});

//Validando credenciales de inicio de sesion
router.post('/login', async (req,res) =>{
    
        
    const {ali, clave} = req.body;
    const values = {
         ali,
        clave}
      
         const values2 = [ ali, clave ] 
     await pool.query("SELECT * FROM user  WHERE correo = ? AND  clave = ? ", values2, (err, result) =>{
         console.log(err)
        if(err){
            
        }else{
            if(result.length > 0){
                
               if(result[0].rol == 'Entrenador'){
                    res.render('links/welcomeEntrenador');
                }
                else{
                    res.render('links/welcomeDeportista');
                }
              
              

            }
            else{
                
                res.render('links/errorlogin');
            }
            console.log(err)
        }
       
       
    });
   await  pool.end();
});




router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM prueba WHERE IDP = ?', [id]);
    console.log(links);
    res.render('links/edit', {link: links[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const {nombrep, fechai, fechaf, descrp,  tipodeprueba} = req.body;
    const links= { 
        nombrep,                               
         fechai, 
         fechaf, 
         descrp, 
        tipodeprueba
    };
    console.log(links)
    await pool.query('UPDATE prueba set ? WHERE IDP = ?', [links, id]);
   
    res.redirect('/links/listado');
});

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM prueba WHERE IDP = ?', [id]);
    
    res.redirect('/links/listado');
});
router.post('/add', async (req,res) =>{
    console.log(req.body);
    const {nombrep, fechai, fechaf, descrp,  tipodeprueba} = req.body;
    const newPrueba= { 
        nombrep,                               
         fechai, 
         fechaf, 
         descrp, 
        tipodeprueba
    };

    console.log(newPrueba);
    await pool.query('INSERT INTO prueba set ?', [newPrueba]);
    res.render('links/confprueba');
});

router.get('/listado' , async(req,res) => {
    const lpruebas = await pool.query('SELECT * FROM prueba');
    console.log(lpruebas);
    res.render('links/list', { lpruebas })
});

router.get('/calendario' , async(req,res) => {
    const lprueba2s = await pool.query('SELECT * FROM prueba');
    console.log(lprueba2s);
    res.render('links/calendar', { lprueba2s })
});




module.exports = router;
