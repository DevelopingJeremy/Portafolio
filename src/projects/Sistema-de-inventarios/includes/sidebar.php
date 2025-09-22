
<div class="sidebar" style="z-index: 99999;">
    <div class="sidebar-header">
        <div class="logo">
            <i class="fas fa-users"></i>
            <span>HYBOX</span>
        </div>
    </div>
    
    <div class="user-info">
        <div class="user-avatar">
            <i class="fas fa-user"></i>
        </div>
        <div class="user-details">
            <span class="user-name"><?php echo $_SESSION['nombre_usuario'] ?></span>
            <span class="user-role">Administrador</span>
        </div>
    </div>
    
    <nav class="sidebar-nav">
        <div class="nav-section">
            <a href="http://localhost:8888/portfolio/src/projects/sistema-de-inventarios/public/dashboard/dashboard.php" class="nav-item">
                <i class="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
            </a>
        </div>
        
        <div class="nav-section">
            <div class="nav-category">INVENTARIO</div>
            <a href="http://localhost:8888/portfolio/src/projects/sistema-de-inventarios/public/inventario/productos.php" class="nav-item">
                <i class="fas fa-box"></i>
                <span>Productos</span>
            </a>
            <a href="http://localhost:8888/portfolio/src/projects/sistema-de-inventarios/public/inventario/categorias.php" class="nav-item">
                <i class="fas fa-tags"></i>
                <span>Categorías</span>
            </a>
            <a href="http://localhost:8888/portfolio/src/projects/sistema-de-inventarios/public/inventario/movimientos.php" class="nav-item">
                <i class="fas fa-exchange-alt"></i>
                <span>Movimientos</span>
            </a>
            <a href="http://localhost:8888/portfolio/src/projects/sistema-de-inventarios/public/inventario/ajustes.php" class="nav-item">
                <i class="fas fa-tools"></i>
                <span>Ajustes</span>
            </a>
        </div>
    </nav>
</div> 