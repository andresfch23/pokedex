import { elements, styles } from '../vars';

export const renderList = options => {
    options.forEach(each => {
        let element = `
            <li class="${styles.listItem}">
                <span data-pok-type="${each.name}">${each.name}</span>
            </li>
        `;                    

        elements.listOptions.insertAdjacentHTML('beforeend', element);
    });
}