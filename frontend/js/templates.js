const templates = {
  oneUser: `
    <td><input name="id" value="{{id}}" disabled></td>
    <td><input name="name" value="{{name}}" class="validate-name" disabled></td>
    <td><input name="emailAddress" value="{{emailAddress}}" class="validate-email" disabled></td>
    <td><input name="address" value="{{address}}" class="validate-address" disabled></td>
    <td>
      <button class="btn-modify" ><i class="fa fa-wrench" aria-hidden="true"></i></button>
      <button class="btn-delete" ><i class="fa fa-trash" aria-hidden="true"></i></button>
      <button class="hidden btn-save" ><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
      <button class="hidden btn-cancel" ><i class="fa fa-undo" aria-hidden="true"></i></button>
    </td>
  `,
};
export default templates;
