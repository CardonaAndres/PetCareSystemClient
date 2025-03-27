import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const successAlert = (message = '') => {
    const MySwal = withReactContent(Swal);

    MySwal.fire({
        icon: 'success',
        iconColor : 'white',
        title: '¡Todo salió bien!',
        text: message,
        background: '#471585', // 7000ff
        color: '#eae1f5', 
        confirmButtonColor: '#1d023d', 
        confirmButtonText: 'Continuar',
        customClass: {
          title: 'swal-title',
          icon: 'swal-icon',
        },
      });

}

export const errorAlert = (message = 'Algo salió mal, por favor intenta de nuevo.') => {
    const MySwal = withReactContent(Swal);
  
    MySwal.fire({
      icon: 'error',
      title: '¡Ups!',
      text: message,
      background: '#B91C1C', // Rojo oscuro
      color: '#ffffff', // Blanco
      confirmButtonColor: '#EF4444', // Rojo claro
      confirmButtonText: 'Aceptar',
      customClass: {
        title: 'swal-title',
        icon: 'swal-icon',
      },
    });
    
};

export const confirmAlert = async (message) => {
  return Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: message,
      color: '#2c2c2c',
      iconColor: '#ffca28',
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#1d023d',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      showClass: {
          popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
      },
      customClass: {
          popup: 'swal2-dark-alert',
      }
  });
};