import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Nat64 "mo:base/Nat64";
actor Calculator {
    public func Suma(x : Nat, y : Nat) : async Nat {
        return x + y;
    };

    public func Resta(x : Nat, y : Nat) : async Nat {
        return x - y;
    };

    public func Multiplicacion(x : Nat, y : Nat) : async Nat {
        return x * y;
    };

    public func Division(x : Nat, y : Nat) : async Text {
        if (y == 0) {
            return "No se puede dividir entre cero";
        } else {
            let division = x / y;
            let divisionComoTexto = Nat.toText(division);
            Debug.print(divisionComoTexto);
            return divisionComoTexto;
        };
    };
};
