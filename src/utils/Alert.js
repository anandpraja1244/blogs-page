import { toast } from "react-toastify";

export function FailedAlert(msg) {
  console.log('msg:>>>>>>', msg)
  return toast.error(msg, {
    position: toast.POSITION.TOP_RIGHT
  })
}

export function SuccessAlert(msg) {
  return toast.success(msg, {
    position: toast.POSITION.TOP_RIGHT
  })
}