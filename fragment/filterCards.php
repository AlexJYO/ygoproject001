<div id="filterMenu">
    <h4 id="optFilter">Opciones de filtrado</h4>
    <?php include('filterName.php'); ?>
    <div class="card">
        <div class="card-body">
            <?php include('filterTypeCard.php'); ?>
            <!---------------------------->
            <div id="filterMonstro" hidden>
                <?php include('filterMonstroTypeInvoka.php'); ?>
                <?php include('filterMonstroAtt.php'); ?>
                <?php include('filterMonstroType.php'); ?>
                <?php include('filterMonstroLev.php'); ?>
                <?php include('filterMonstroRar.php'); ?>
            </div>
            <!---------------------------------->
            <div id="filterSpell" hidden>
                <?php include('filterSpell.php'); ?>
            </div>
            <!------------------------------------------>
            <div id="filterTrap" hidden>
                <?php include('filterTrap.php'); ?>
            </div>
            <div id="filterValue" hidden>
                <?php include('filterValue.php'); ?>
            </div>
        </div>
    </div>
</div>