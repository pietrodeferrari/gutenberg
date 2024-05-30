/** @typedef {import('../api/registration').WPBlockVariation} WPBlockVariation */

/**
 * Returns the active block variation for a given block based on its attributes.
 * Variations are determined by their `isActive` property.
 * Which is either an array of block attribute keys or a function.
 *
 * In case of an array of block attribute keys, the `attributes` are compared
 * to the variation's attributes using strict equality check.
 *
 * In case of function type, the function should accept a block's attributes
 * and the variation's attributes and determines if a variation is active.
 * A function that accepts a block's attributes and the variation's attributes and determines if a variation is active.
 *
 * @param {Array}  variations Data state.
 * @param {Object} blockType  Name of block (example: “core/columns”).
 * @param {Object} attributes Block attributes used to determine active variation.
 *
 * @return {(WPBlockVariation|undefined)} Active block variation.
 */
function getBlockTypeActiveVariation( variations, blockType, attributes ) {
	const match = variations?.find( ( variation ) => {
		if ( Array.isArray( variation.isActive ) ) {
			const attributeKeys = Object.keys( blockType?.attributes || {} );
			const definedAttributes = variation.isActive.filter(
				( attribute ) => attributeKeys.includes( attribute )
			);
			if ( definedAttributes.length === 0 ) {
				return false;
			}
			return definedAttributes.every(
				( attribute ) =>
					attributes[ attribute ] ===
					variation.attributes[ attribute ]
			);
		}

		return variation.isActive?.( attributes, variation.attributes );
	} );

	return match;
}

export default getBlockTypeActiveVariation;
