import React, { useState, useRef, useEffect, useCallback } from "react";

const ICONS = {
  react: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.29zm-9.77.001c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.133zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.150-1.315.283-2.015.386.24-.375.48-.762.705-1.158.225-.39.435-.788.634-1.176zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
    </svg>
  ),
  nodejs: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.890V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L1.677,18.556C1.04,18.196,0.646,17.513,0.646,16.771V6.921 c0-0.748,0.394-1.431,1.031-1.792l8.795-5.082c0.621-0.352,1.452-0.352,2.068,0l8.795,5.082 c0.636,0.361,1.031,1.045,1.031,1.792v10.15c0,0.747-0.395,1.427-1.031,1.792l-8.795,5.076C12.641,23.916,12.321,24,11.998,24z M19.099,13.993c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
    </svg>
  ),
  express: (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z"/>
    </svg>
    ),
  django: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4.002 2.65-6.6 6.753-6.6.637 0 1.121.05 1.707.203zm0 9.143a3.894 3.894 0 0 0-1.325-.204c-1.988 0-3.134 1.223-3.134 3.365 0 2.09 1.096 3.236 3.109 3.236.433 0 .79-.025 1.35-.102V9.142zM21.314 6.06v11.666c0 4.025-.3 5.963-1.172 7.632-.817 1.617-1.986 2.64-4.32 3.77l-3.644-1.729c2.334-1.079 3.503-2.025 4.269-3.49.815-1.515 1.07-3.249 1.07-7.83V6.061h3.797zM17.49 0h3.924v4.019H17.49z"/>
    </svg>
  ),
  mongodb: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
    </svg>
  ),
  mysql: (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 00-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 00-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.877.615 1.583.615.264 0 .506-.033.725-.098l1.325.772.36-.622zM15.5 17.588c-.225-.36-.337-.94-.337-1.736 0-1.393.424-2.09 1.27-2.09.443 0 .77.167.977.5.224.362.336.936.336 1.723 0 1.404-.424 2.108-1.27 2.108-.445 0-.77-.167-.978-.5zm-1.658-.425c0 .47-.172.856-.516 1.156-.344.3-.803.45-1.384.45-.543 0-1.064-.172-1.573-.515l.237-.476c.438.22.833.328 1.19.328.332 0 .593-.073.783-.22a.754.754 0 00.3-.615c0-.33-.23-.61-.648-.845-.388-.213-1.163-.657-1.163-.657-.422-.307-.632-.636-.632-1.177 0-.45.157-.81.47-1.085.315-.278.72-.415 1.22-.415.512 0 .98.136 1.4.41l-.213.476a2.726 2.726 0 00-1.064-.23c-.283 0-.502.068-.654.206a.685.685 0 00-.248.524c0 .328.234.61.666.85.393.215 1.187.67 1.187.67.433.305.648.63.648 1.168zm9.382-5.852c-.535-.014-.95.04-1.297.188-.1.04-.26.04-.274.167.055.053.063.14.11.214.08.134.218.313.346.407.14.11.28.216.427.31.26.16.555.255.81.416.145.094.293.213.44.313.073.05.12.14.214.172v-.02c-.046-.06-.06-.147-.105-.214-.067-.067-.134-.127-.2-.193a3.223 3.223 0 00-.695-.675c-.214-.146-.682-.35-.77-.595l-.013-.014c.146-.013.32-.066.46-.106.227-.06.435-.047.67-.106.106-.027.213-.06.32-.094v-.06c-.12-.12-.21-.283-.334-.395a8.867 8.867 0 00-1.104-.823c-.21-.134-.476-.22-.697-.334-.08-.04-.214-.06-.26-.127-.12-.146-.19-.34-.275-.514a17.69 17.69 0 01-.547-1.163c-.12-.262-.193-.523-.34-.763-.69-1.137-1.437-1.826-2.586-2.5-.247-.14-.543-.2-.856-.274-.167-.008-.334-.02-.5-.027-.11-.047-.216-.174-.31-.235-.38-.24-1.364-.76-1.644-.072-.18.434.267.862.422 1.082.115.153.26.328.34.5.047.116.06.235.107.356.106.294.207.622.347.897.073.14.153.287.247.413.054.073.146.107.167.227-.094.136-.1.334-.154.5-.24.757-.146 1.693.194 2.25.107.166.362.534.703.393.3-.12.234-.5.32-.835.02-.08.007-.133.048-.187v.015c.094.188.188.367.274.555.206.328.566.668.867.895.16.12.287.328.487.402v-.02h-.015c-.043-.058-.1-.086-.154-.133a3.445 3.445 0 01-.35-.4 8.76 8.76 0 01-.747-1.218c-.11-.21-.202-.436-.29-.643-.04-.08-.04-.2-.107-.24-.1.146-.247.273-.32.453-.127.288-.14.642-.188 1.01-.027.007-.014 0-.027.014-.214-.052-.287-.274-.367-.46-.2-.475-.233-1.238-.06-1.785.047-.14.247-.582.167-.716-.042-.127-.174-.2-.247-.303a2.478 2.478 0 01-.24-.427c-.16-.374-.24-.788-.414-1.162-.08-.173-.22-.354-.334-.513-.127-.18-.267-.307-.368-.52-.033-.073-.08-.194-.027-.274.014-.054.042-.075.094-.09.088-.072.335.022.422.062.247.1.455.194.662.334.094.066.195.193.315.226h.14c.214.047.455.014.655.073.355.114.675.28.962.46a5.953 5.953 0 012.085 2.286c.08.154.115.295.188.455.14.33.313.663.455.982.14.315.275.636.476.897.1.14.502.213.682.286.133.06.34.115.46.188.23.14.454.3.67.454.11.076.443.243.463.378z"/>
    </svg>
    ),
  digitalocean: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M12.04 0C5.408-.02.005 5.37.005 11.992h4.638c0-4.923 4.882-8.731 10.064-6.855a6.95 6.95 0 0 1 4.147 4.148c1.889 5.177-1.924 10.055-6.84 10.064v-4.61H7.391v4.623h4.61V24c7.86-.942 13.312-8.392 11.114-16.473C21.733 3.02 17.26-.009 12.04 0zM7.39 19.362H3.828v3.564H7.39zm-3.563 0v-3.239H.002v3.239z"/>
    </svg>
  ),
  aws: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.894-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.030-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.568.031-.863.103-.295.072-.583.16-.862.272a2.287 2.287 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167c.279-.144.614-.264 1.005-.36a4.84 4.84 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586zm-3.24 1.214c.263 0 .534-.048.822-.144.287-.096.543-.271.758-.51.128-.152.224-.32.272-.512.047-.191.08-.423.08-.694v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.479.296.838.296zm6.41.862c-.144 0-.240-.024-.304-.08-.064-.048-.12-.16-.168-.311L7.586 5.55a1.398 1.398 0 0 1-.072-.32c0-.128.064-.2.191-.2h.783c.151 0 .255.025.31.08.065.048.113.16.16.312l1.342 5.284 1.245-5.284c.04-.16.088-.264.151-.312a.549.549 0 0 1 .32-.08h.638c.152 0 .256.025.32.08.063.048.12.16.151.312l1.261 5.348 1.381-5.348c.048-.16.104-.264.16-.312a.52.52 0 0 1 .311-.08h.743c.127 0 .2.065.2.2 0 .04-.009.08-.017.128a1.137 1.137 0 0 1-.056.2l-1.923 6.17c-.048.16-.104.263-.168.311a.51.51 0 0 1-.303.08h-.687c-.151 0-.255-.024-.32-.08-.063-.056-.119-.16-.15-.32l-1.238-5.148-1.23 5.14c-.04.16-.087.264-.15.32-.065.056-.177.08-.32.08zm10.256.215c-.415 0-.83-.048-1.229-.143-.399-.096-.71-.2-.918-.32-.128-.071-.215-.151-.247-.223a.563.563 0 0 1-.048-.224v-.407c0-.167.064-.247.183-.247.048 0 .096.008.144.024.048.016.12.048.2.08.271.12.566.215.878.279.319.064.63.096.95.096.502 0 .894-.088 1.165-.264a.86.86 0 0 0 .415-.758.777.777 0 0 0-.215-.559c-.144-.151-.416-.287-.807-.415l-1.157-.36c-.583-.183-1.014-.454-1.277-.813a1.902 1.902 0 0 1-.4-1.158c0-.335.073-.63.216-.886.144-.255.335-.479.575-.654.24-.184.51-.32.83-.415.32-.096.655-.136 1.006-.136.175 0 .359.008.535.032.183.024.35.056.518.088.16.04.312.08.455.127.144.048.256.096.336.144a.69.69 0 0 1 .24.2.43.43 0 0 1 .071.263v.375c0 .168-.064.256-.184.256a.83.83 0 0 1-.303-.096 3.652 3.652 0 0 0-1.532-.311c-.455 0-.815.071-1.062.223-.248.152-.375.383-.375.71 0 .224.08.416.24.567.159.152.454.304.877.44l1.134.358c.574.184.99.44 1.237.767.247.327.367.702.367 1.117 0 .343-.072.655-.207.926-.144.272-.336.511-.583.703-.248.2-.543.343-.886.447-.36.111-.734.167-1.142.167z"/>
      <path d="M20.16 17.525c-2.137 1.578-5.24 2.42-7.912 2.42-3.74 0-7.108-1.381-9.656-3.678-.2-.182-.022-.43.22-.287 2.748 1.598 6.141 2.563 9.648 2.563 2.365 0 4.962-.49 7.353-1.507.36-.155.663.232.348.49"/>
      <path d="M21.069 16.485c-.272-.35-1.798-.165-2.484-.083-.207.024-.24-.157-.053-.29 1.217-.854 3.215-.607 3.446-.32.23.287-.063 2.285-1.205 3.238-.175.147-.343.071-.264-.124.257-.636.831-2.062.56-2.42"/>
    </svg>
  ),
  javascript: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
    </svg>
  ),
  cplusplus: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.109-7.11a7.133 7.133 0 0 1 6.156 3.553l-3.076 1.78a3.567 3.567 0 0 0-3.08-1.78A3.56 3.56 0 0 0 8.444 12 3.56 3.56 0 0 0 12 15.555a3.57 3.57 0 0 0 3.08-1.778l3.078 1.78A7.135 7.135 0 0 1 12 19.11zm7.11-6.715h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79zm2.962 0h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79z"/>
    </svg>
  ),
  git: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.606-.404-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  ),
  postman: (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.527.099C6.955-.744.942 3.9.099 10.473c-.843 6.572 3.8 12.584 10.373 13.428 6.573.843 12.587-3.801 13.428-10.374C24.744 6.955 20.101.943 13.527.099zm2.471 7.485a.855.855 0 0 0-.593.25l-4.453 4.453-.307-.307-.643-.643c4.389-4.376 5.18-4.418 5.996-3.753zm-4.863 4.861l4.44-4.44a.62.62 0 1 1 .847.903l-4.699 4.125-.588-.588zm.33.694l-1.1.238a.06.06 0 0 1-.067-.032.06.06 0 0 1 .01-.073l.645-.645.512.512zm-2.803-.459l1.172-1.172.879.878-1.979.426a.074.074 0 0 1-.085-.039.072.072 0 0 1 .013-.093zm-3.646 6.058a.076.076 0 0 1-.069-.083.077.077 0 0 1 .022-.046h.002l.946-.946 1.222 1.222-2.123-.147zm2.425-1.256a.228.228 0 0 0-.117.256l.203.865a.125.125 0 0 1-.211.117h-.003l-.934-.934-.294-.295 3.762-3.758 1.82-.393.874.874c-1.255 1.102-2.971 2.201-5.1 3.268zm5.279-3.428h-.002l-.839-.839 4.699-4.125a.952.952 0 0 0 .119-.127c-.148 1.345-2.029 3.245-3.977 5.091zm3.657-6.46l-.003-.002a1.822 1.822 0 0 1 2.459-2.684l-1.61 1.613a.119.119 0 0 0 0 .169l1.247 1.247a1.817 1.817 0 0 1-2.093-.343zm2.578 0a1.714 1.714 0 0 1-.271.218h-.001l-1.207-1.207 1.533-1.533c.661.72.637 1.832-.054 2.522zM18.855 6.05a.143.143 0 0 0-.053.157.416.416 0 0 1-.053.45.14.14 0 0 0 .023.197.141.141 0 0 0 .084.03.14.14 0 0 0 .106-.05.691.691 0 0 0 .087-.751.138.138 0 0 0-.194-.033z"/>
    </svg>
    ),
  canva: (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.5921 9.1962s-.354-3.298-3.627-3.39c-3.2741-.09-4.9552 2.474-4.9552 6.14 0 3.6651 1.858 6.5972 5.0451 6.5972 3.184 0 3.5381-3.665 3.5381-3.665l6.1041.365s.36 3.31-2.196 5.836c-2.552 2.5241-5.6901 2.9371-7.8762 2.9201-2.19-.017-5.2261.034-8.1602-2.97-2.938-3.0101-3.436-5.9302-3.436-8.8002 0-2.8701.556-6.6702 4.047-9.5502C7.444.72 9.849 0 12.254 0c10.0422 0 10.7172 9.2602 10.7172 9.2602z"/>
    </svg>
    ),
  figma: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"/>
    </svg>
  ),
};

const techStack = [
  { label: "React",        color: "#61DAFB", svg: ICONS.react },
  { label: "React Native", color: "#61DAFB", svg: ICONS.react },
  { label: "Node.js",      color: "#6DA55F", svg: ICONS.nodejs },
  { label: "Express.js",   color: "#AAAAAA", svg: ICONS.express },
  { label: "Django",       color: "#44B78B", svg: ICONS.django },
  { label: "MongoDB",      color: "#47A248", svg: ICONS.mongodb },
  { label: "MySQL",        color: "#4479A1", svg: ICONS.mysql },
  { label: "DigitalOcean", color: "#0080FF", svg: ICONS.digitalocean },
  { label: "AWS",          color: "#FF9900", svg: ICONS.aws },
  { label: "JavaScript",   color: "#F7DF1E", svg: ICONS.javascript },
  { label: "C++",          color: "#6295CB", svg: ICONS.cplusplus },
  { label: "Git",          color: "#F05032", svg: ICONS.git },
  { label: "GitHub",       color: "#FFFFFF", svg: ICONS.github },
  { label: "Postman",      color: "#FF6C37", svg: ICONS.postman },
  { label: "Canva",        color: "#00C4CC", svg: ICONS.canva },
  { label: "Figma",        color: "#F24E1E", svg: ICONS.figma },
];

const COUNT = techStack.length;
const STEP = (2 * Math.PI) / COUNT;
const R = 175;
const SIZE = R * 2 + 100;
const CX = SIZE / 2;
const CY = SIZE / 2;

export default function AboutSection() {
  const [angle, setAngle] = useState(0);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const lastY = useRef(0);
  const velocityRef = useRef(0);
  const angleRef = useRef(0);
  const rafRef = useRef(null);
  const containerRef = useRef(null);

  // Keep angleRef in sync for closures
  useEffect(() => { angleRef.current = angle; }, [angle]);

  // Which item is closest to the top (theta = -PI/2)?
  const getActiveIndex = (a) => {
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < COUNT; i++) {
      const theta = a + i * STEP - Math.PI / 2;
      // Normalize theta to [-PI, PI]
      const norm = Math.atan2(Math.sin(theta), Math.cos(theta));

      const dist = Math.abs(Math.atan2(Math.sin(norm + Math.PI / 2), Math.cos(norm + Math.PI / 2)));
      if (dist < bestDist) { bestDist = dist; best = i; }
    }
    return best;
  };

  const snapToNearest = useCallback((currentAngle) => {
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < COUNT; i++) {
      const theta = currentAngle + i * STEP - Math.PI / 2;
      const norm = Math.atan2(Math.sin(theta), Math.cos(theta));
      const dist = Math.abs(Math.atan2(Math.sin(norm + Math.PI / 2), Math.cos(norm + Math.PI / 2)));
      if (dist < bestDist) { bestDist = dist; best = i; }
    }
    const idealOffset = -best * STEP;
    const turns = Math.round((currentAngle - idealOffset) / (2 * Math.PI));
    const snapped = idealOffset + turns * 2 * Math.PI;
    setAngle(snapped);
    angleRef.current = snapped;
  }, []);

  const startInertia = useCallback((vel) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    let v = vel;
    const tick = () => {
      v *= 0.91;
      angleRef.current += v;
      setAngle(angleRef.current);
      if (Math.abs(v) > 0.003) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        snapToNearest(angleRef.current);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [snapToNearest]);

  const onMouseDown = useCallback((e) => {
    dragging.current = true;
    lastX.current = e.clientX;
    lastY.current = e.clientY;
    velocityRef.current = 0;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    e.preventDefault();
  }, []);

  const onMouseMove = useCallback((e) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    const dy = e.clientY - lastY.current;
    const delta = (dx - dy) * 0.013;
    velocityRef.current = delta;
    angleRef.current += delta;
    setAngle(angleRef.current);
    lastX.current = e.clientX;
    lastY.current = e.clientY;
  }, []);

  const onMouseUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    startInertia(velocityRef.current);
  }, [startInertia]);

  const scrollCooldown = useRef(false);
  const onWheel = useCallback((e) => {
    e.preventDefault();
    if (scrollCooldown.current) return;
    scrollCooldown.current = true;
    setTimeout(() => { scrollCooldown.current = false; }, 180);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const dir = e.deltaY > 0 ? -1 : 1;
    const current = getActiveIndex(angleRef.current);
    const next = (current - dir + COUNT) % COUNT;
    const idealOffset = -next * STEP;
    const turns = Math.round((angleRef.current - idealOffset) / (2 * Math.PI));
    const snapped = idealOffset + turns * 2 * Math.PI;
    angleRef.current = snapped;
    setAngle(snapped);
  }, []);


  const lastTouchRef = useRef(0);
  const onTouchStart = useCallback((e) => {
    lastTouchRef.current = e.touches[0].clientY - e.touches[0].clientX;
    velocityRef.current = 0;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  const onTouchMove = useCallback((e) => {
    const pos = e.touches[0].clientY - e.touches[0].clientX;
    const delta = (pos - lastTouchRef.current) * 0.013;
    velocityRef.current = delta;
    angleRef.current += delta;
    setAngle(angleRef.current);
    lastTouchRef.current = pos;
    e.preventDefault();
  }, []);

  const onTouchEnd = useCallback(() => {
    startInertia(velocityRef.current);
  }, [startInertia]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onWheel, onMouseMove, onMouseUp, onTouchStart, onTouchMove, onTouchEnd]);

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  const activeIndex = getActiveIndex(angle);
  const active = techStack[activeIndex];

  return (
    <>
    <style>{`
      @media (max-width: 768px) {
        .swatch-outer { transform: scale(0.62); transform-origin: top center; }
        .swatch-outer-wrap { height: 290px; display: flex; align-items: flex-start; justify-content: center; overflow: hidden; }
      }
      @media (min-width: 769px) and (max-width: 1100px) {
        .swatch-outer { transform: scale(0.8); transform-origin: top left; }
        .swatch-outer-wrap { height: 370px; }
      }
    `}</style>
    <section
      style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}
      className="w-full max-w-7xl mx-auto px-6 md:px-12 py-24 flex flex-col md:flex-row items-center gap-16 md:gap-20"
    >

      <div className="flex-shrink-0 flex flex-col items-center w-full md:w-auto" style={{ userSelect: "none" }}>
        <div className="swatch-outer-wrap">
        <div
          ref={containerRef}
          onMouseDown={onMouseDown}
          className="swatch-outer"
          style={{
            width: SIZE,
            height: SIZE,
            cursor: "grab",
            position: "relative",
            touchAction: "none",
            maxWidth: "100%",
          }}
        >

          <svg
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
          >
            <circle
              cx={CX} cy={CY} r={R}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
              strokeDasharray="3 8"
            />
          </svg>

          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            <span style={{ color: active.color, transition: "color 0.2s", display: "flex", alignItems: "center", filter: active.color === "#FFFFFF" ? "drop-shadow(0 0 8px rgba(255,255,255,0.9))" : "none" }}>
              {active.svg}
            </span>
            <span
              style={{
                fontSize: 10,
                letterSpacing: "0.15em",
                marginTop: 7,
                color: active.color,
                fontWeight: 600,
                textTransform: "uppercase",
                transition: "color 0.2s",
              }}
            >
              {active.label}
            </span>
          </div>

          {techStack.map((tech, i) => {
            const theta = angle + i * STEP - Math.PI / 2;
            const x = CX + R * Math.cos(theta);
            const y = CY + R * Math.sin(theta);
            const isActive = i === activeIndex;

            return (
              <div
                key={tech.label}
                onClick={() => {
                  if (rafRef.current) cancelAnimationFrame(rafRef.current);
                  const idealOffset = -i * STEP;
                  const turns = Math.round((angleRef.current - idealOffset) / (2 * Math.PI));
                  const snapped = idealOffset + turns * 2 * Math.PI;
                  setAngle(snapped);
                  angleRef.current = snapped;
                }}
                title={tech.label}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  width: isActive ? 72 : 58,
                  height: isActive ? 72 : 58,
                  transform: "translate(-50%, -50%)",
                  borderRadius: "50%",
                  border: `${isActive ? "1.5px" : "1px"} solid ${isActive ? tech.color : tech.color + "55"}`,
                  background: isActive ? `${tech.color}20` : `${tech.color}08`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: isActive ? 24 : 19,
                  color: tech.color,
                  opacity: isActive ? 1 : 0.45,
                  cursor: "pointer",
                  zIndex: isActive ? 20 : 1,
                  transition: "width 0.2s, height 0.2s, border-color 0.2s, color 0.2s, opacity 0.2s, font-size 0.2s, transform 0.2s",
                  boxSizing: "border-box",
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.width = "66px";
                    e.currentTarget.style.height = "66px";
                    e.currentTarget.style.opacity = "0.75";
                    e.currentTarget.style.borderColor = tech.color + "aa";
                    e.currentTarget.style.background = tech.color + "18";
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.width = "58px";
                    e.currentTarget.style.height = "58px";
                    e.currentTarget.style.opacity = "0.45";
                    e.currentTarget.style.borderColor = tech.color + "55";
                    e.currentTarget.style.background = tech.color + "08";
                  }
                }}
              >
                <span style={{ userSelect: "none", pointerEvents: "none", display: "flex", filter: isActive && tech.color === "#FFFFFF" ? "drop-shadow(0 0 6px rgba(255,255,255,0.9))" : "none" }}>{tech.svg}</span>
              </div>
            );
          })}
        </div>

        </div>
        <p style={{ fontSize: 10, letterSpacing: "0.15em", color: "rgba(255,255,255,0.18)", marginTop: 8, textTransform: "uppercase" }}>
          drag · scroll · tap
        </p>
      </div>

      <div className="flex flex-col items-center md:items-start gap-6 flex-1 min-w-0 text-center md:text-left w-full">
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            overflow: "hidden",
            border: "1.5px solid rgba(255,255,255,0.09)",
            background: "#111118",
            flexShrink: 0,
          }}
        >

          <img
            src="https://placehold.co/200x200/111118/444?text=You"
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: "#2D2C2C",
              marginBottom: 10,
              letterSpacing: "-0.015em",
            }}
          >
            Your Name
          </h2>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.85,
              color: "#2D2C2C",
              maxWidth: 380,
              margin: 0,
            }}
          >
            	I aspire to become a Software Engineer specializing in web development.
                Throughout my education, I worked effectively in diverse teams, adapted 
                quickly to new environments, and have led projects to successful completion.
          </p>
        </div>
      </div>
    </section>
    </>
  );
}