<ul class="list-disc pl-6">
    @foreach($items as $item)
        <li>
            {{ $item->name }} || (taille {{ $item->size }}) × {{ $item->quantity }}
        </li>
    @endforeach

</ul>