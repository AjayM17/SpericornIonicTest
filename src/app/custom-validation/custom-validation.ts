
import { AbstractControl, } from '@angular/forms';

// export  const pass =(control: AbstractControl)=>{
//     console.log(control.root.value.password);
//     if(control.root.value.password === control.root.value.confirmPassword){
//         return { match : true};
//     }
//     return null;
// };

export  const passwordMatch =(control: AbstractControl)=>{
    console.log(control.root.value.password);
    console.log(control.root.value.confirmPassword);
    if(control.root.value.password === control.root.value.confirmPassword){
        return { match : true};
    }
    return null;
};
