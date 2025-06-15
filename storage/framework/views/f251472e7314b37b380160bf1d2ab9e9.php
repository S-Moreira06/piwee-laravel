<ul class="list-disc pl-6">
    <!--[if BLOCK]><![endif]--><?php $__currentLoopData = $items; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $item): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <li>
            <?php echo e($item->name); ?> || (taille <?php echo e($item->size); ?>) × <?php echo e($item->quantity); ?>

        </li>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?><!--[if ENDBLOCK]><![endif]-->

</ul><?php /**PATH C:\Users\Utilisateur\Desktop\labs\piwee-laravel\resources\views/admin/order-item-list.blade.php ENDPATH**/ ?>