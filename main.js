// Copyright 2018 Google LLC All Rights Reserved.
(function() {
    var l, aa = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
            a != Array.prototype && a != Object.prototype && (a[b] = c.value)
        },
        ba = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this,
        ca = function() {
            ca = function() {};
            ba.Symbol || (ba.Symbol = da)
        },
        da = function() {
            var a = 0;
            return function(b) {
                return "jscomp_symbol_" + (b || "") + a++
            }
        }(),
        fa = function() {
            ca();
            var a = ba.Symbol.iterator;
            a || (a = ba.Symbol.iterator = ba.Symbol("iterator"));
            "function" != typeof Array.prototype[a] &&
                aa(Array.prototype, a, {
                    configurable: !0,
                    writable: !0,
                    value: function() {
                        return ea(this)
                    }
                });
            fa = function() {}
        },
        ea = function(a) {
            var b = 0;
            return ha(function() {
                return b < a.length ? {
                    done: !1,
                    value: a[b++]
                } : {
                    done: !0
                }
            })
        },
        ha = function(a) {
            fa();
            a = {
                next: a
            };
            a[ba.Symbol.iterator] = function() {
                return this
            };
            return a
        },
        p = function(a) {
            fa();
            var b = a[Symbol.iterator];
            return b ? b.call(a) : ea(a)
        },
        ia = "function" == typeof Object.create ? Object.create : function(a) {
            var b = function() {};
            b.prototype = a;
            return new b
        },
        ja;
    if ("function" == typeof Object.setPrototypeOf) ja = Object.setPrototypeOf;
    else {
        var ka;
        a: {
            var la = {
                    Yk: !0
                },
                ma = {};
            try {
                ma.__proto__ = la;
                ka = ma.Yk;
                break a
            } catch (a) {}
            ka = !1
        }
        ja = ka ? function(a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
            return a
        } : null
    }
    var na = ja,
        q = function(a, b) {
            a.prototype = ia(b.prototype);
            a.prototype.constructor = a;
            if (na) na(a, b);
            else
                for (var c in b)
                    if ("prototype" != c)
                        if (Object.defineProperties) {
                            var d = Object.getOwnPropertyDescriptor(b, c);
                            d && Object.defineProperty(a, c, d)
                        } else a[c] = b[c];
            a.Ec = b.prototype
        },
        oa = function(a) {
            if (!(a instanceof Array)) {
                a = p(a);
                for (var b, c = []; !(b = a.next()).done;) c.push(b.value);
                a = c
            }
            return a
        },
        pa = function(a, b) {
            if (b) {
                var c = ba;
                a = a.split(".");
                for (var d = 0; d < a.length - 1; d++) {
                    var e = a[d];
                    e in c || (c[e] = {});
                    c = c[e]
                }
                a = a[a.length -
                    1];
                d = c[a];
                b = b(d);
                b != d && null != b && aa(c, a, {
                    configurable: !0,
                    writable: !0,
                    value: b
                })
            }
        },
        qa = function(a, b, c) {
            if (null == a) throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
            if (b instanceof RegExp) throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
            return a + ""
        };
    pa("Array.prototype.find", function(a) {
        return a ? a : function(a, c) {
            a: {
                var b = this;b instanceof String && (b = String(b));
                for (var e = b.length, f = 0; f < e; f++) {
                    var g = b[f];
                    if (a.call(c, g, f, b)) {
                        a = g;
                        break a
                    }
                }
                a = void 0
            }
            return a
        }
    });
    pa("String.prototype.endsWith", function(a) {
        return a ? a : function(a, c) {
            var b = qa(this, a, "endsWith");
            a += "";
            void 0 === c && (c = b.length);
            c = Math.max(0, Math.min(c | 0, b.length));
            for (var e = a.length; 0 < e && 0 < c;)
                if (b[--c] != a[--e]) return !1;
            return 0 >= e
        }
    });
    var ra = function(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b)
        },
        sa = "function" == typeof Object.assign ? Object.assign : function(a, b) {
            for (var c = 1; c < arguments.length; c++) {
                var d = arguments[c];
                if (d)
                    for (var e in d) ra(d, e) && (a[e] = d[e])
            }
            return a
        };
    pa("Object.assign", function(a) {
        return a || sa
    });
    pa("Math.trunc", function(a) {
        return a ? a : function(a) {
            a = Number(a);
            if (isNaN(a) || Infinity === a || -Infinity === a || 0 === a) return a;
            var b = Math.floor(Math.abs(a));
            return 0 > a ? -b : b
        }
    });
    pa("Array.prototype.fill", function(a) {
        return a ? a : function(a, c, d) {
            var b = this.length || 0;
            0 > c && (c = Math.max(0, b + c));
            if (null == d || d > b) d = b;
            d = Number(d);
            0 > d && (d = Math.max(0, b + d));
            for (c = Number(c || 0); c < d; c++) this[c] = a;
            return this
        }
    });
    pa("WeakMap", function(a) {
        function b(a) {
            ra(a, d) || aa(a, d, {
                value: {}
            })
        }

        function c(a) {
            var c = Object[a];
            c && (Object[a] = function(a) {
                b(a);
                return c(a)
            })
        }
        if (function() {
                if (!a || !Object.seal) return !1;
                try {
                    var b = Object.seal({}),
                        c = Object.seal({}),
                        d = new a([
                            [b, 2],
                            [c, 3]
                        ]);
                    if (2 != d.get(b) || 3 != d.get(c)) return !1;
                    d["delete"](b);
                    d.set(c, 4);
                    return !d.has(b) && 4 == d.get(c)
                } catch (m) {
                    return !1
                }
            }()) return a;
        var d = "$jscomp_hidden_" + Math.random();
        c("freeze");
        c("preventExtensions");
        c("seal");
        var e = 0,
            f = function(a) {
                this.oc = (e += Math.random() +
                    1).toString();
                if (a) {
                    ca();
                    fa();
                    a = p(a);
                    for (var b; !(b = a.next()).done;) b = b.value, this.set(b[0], b[1])
                }
            };
        f.prototype.set = function(a, c) {
            b(a);
            if (!ra(a, d)) throw Error("WeakMap key fail: " + a);
            a[d][this.oc] = c;
            return this
        };
        f.prototype.get = function(a) {
            return ra(a, d) ? a[d][this.oc] : void 0
        };
        f.prototype.has = function(a) {
            return ra(a, d) && ra(a[d], this.oc)
        };
        f.prototype["delete"] = function(a) {
            return ra(a, d) && ra(a[d], this.oc) ? delete a[d][this.oc] : !1
        };
        return f
    });
    pa("Map", function(a) {
        if (function() {
                if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
                try {
                    var b = Object.seal({
                            x: 4
                        }),
                        c = new a(p([
                            [b, "s"]
                        ]));
                    if ("s" != c.get(b) || 1 != c.size || c.get({
                            x: 4
                        }) || c.set({
                            x: 4
                        }, "t") != c || 2 != c.size) return !1;
                    var d = c.entries(),
                        e = d.next();
                    if (e.done || e.value[0] != b || "s" != e.value[1]) return !1;
                    e = d.next();
                    return e.done || 4 != e.value[0].x || "t" != e.value[1] || !d.next().done ? !1 : !0
                } catch (t) {
                    return !1
                }
            }()) return a;
        ca();
        fa();
        var b = new WeakMap,
            c = function(a) {
                this.yd = {};
                this.sa = f();
                this.size = 0;
                if (a) {
                    a = p(a);
                    for (var b; !(b = a.next()).done;) b = b.value, this.set(b[0], b[1])
                }
            };
        c.prototype.set = function(a, b) {
            var c = d(this, a);
            c.list || (c.list = this.yd[c.id] = []);
            c.ja ? c.ja.value = b : (c.ja = {
                next: this.sa,
                Bb: this.sa.Bb,
                head: this.sa,
                key: a,
                value: b
            }, c.list.push(c.ja), this.sa.Bb.next = c.ja, this.sa.Bb = c.ja, this.size++);
            return this
        };
        c.prototype["delete"] = function(a) {
            a = d(this, a);
            return a.ja && a.list ? (a.list.splice(a.index, 1), a.list.length || delete this.yd[a.id], a.ja.Bb.next = a.ja.next, a.ja.next.Bb =
                a.ja.Bb, a.ja.head = null, this.size--, !0) : !1
        };
        c.prototype.clear = function() {
            this.yd = {};
            this.sa = this.sa.Bb = f();
            this.size = 0
        };
        c.prototype.has = function(a) {
            return !!d(this, a).ja
        };
        c.prototype.get = function(a) {
            return (a = d(this, a).ja) && a.value
        };
        c.prototype.entries = function() {
            return e(this, function(a) {
                return [a.key, a.value]
            })
        };
        c.prototype.keys = function() {
            return e(this, function(a) {
                return a.key
            })
        };
        c.prototype.values = function() {
            return e(this, function(a) {
                return a.value
            })
        };
        c.prototype.forEach = function(a, b) {
            for (var c = this.entries(),
                    d; !(d = c.next()).done;) d = d.value, a.call(b, d[1], d[0], this)
        };
        c.prototype[Symbol.iterator] = c.prototype.entries;
        var d = function(a, c) {
                var d = c && typeof c;
                "object" == d || "function" == d ? b.has(c) ? d = b.get(c) : (d = "" + ++g, b.set(c, d)) : d = "p_" + c;
                var e = a.yd[d];
                if (e && ra(a.yd, d))
                    for (a = 0; a < e.length; a++) {
                        var f = e[a];
                        if (c !== c && f.key !== f.key || c === f.key) return {
                            id: d,
                            list: e,
                            index: a,
                            ja: f
                        }
                    }
                return {
                    id: d,
                    list: e,
                    index: -1,
                    ja: void 0
                }
            },
            e = function(a, b) {
                var c = a.sa;
                return ha(function() {
                    if (c) {
                        for (; c.head != a.sa;) c = c.Bb;
                        for (; c.next != c.head;) return c =
                            c.next, {
                                done: !1,
                                value: b(c)
                            };
                        c = null
                    }
                    return {
                        done: !0,
                        value: void 0
                    }
                })
            },
            f = function() {
                var a = {};
                return a.Bb = a.next = a.head = a
            },
            g = 0;
        return c
    });
    pa("Set", function(a) {
        if (function() {
                if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) return !1;
                try {
                    var b = Object.seal({
                            x: 4
                        }),
                        d = new a(p([b]));
                    if (!d.has(b) || 1 != d.size || d.add(b) != d || 1 != d.size || d.add({
                            x: 4
                        }) != d || 2 != d.size) return !1;
                    var e = d.entries(),
                        f = e.next();
                    if (f.done || f.value[0] != b || f.value[1] != b) return !1;
                    f = e.next();
                    return f.done || f.value[0] == b || 4 != f.value[0].x || f.value[1] != f.value[0] ? !1 : e.next().done
                } catch (g) {
                    return !1
                }
            }()) return a;
        ca();
        fa();
        var b = function(a) {
            this.R = new Map;
            if (a) {
                a = p(a);
                for (var b; !(b = a.next()).done;) this.add(b.value)
            }
            this.size = this.R.size
        };
        b.prototype.add = function(a) {
            this.R.set(a, a);
            this.size = this.R.size;
            return this
        };
        b.prototype["delete"] = function(a) {
            a = this.R["delete"](a);
            this.size = this.R.size;
            return a
        };
        b.prototype.clear = function() {
            this.R.clear();
            this.size = 0
        };
        b.prototype.has = function(a) {
            return this.R.has(a)
        };
        b.prototype.entries = function() {
            return this.R.entries()
        };
        b.prototype.values = function() {
            return this.R.values()
        };
        b.prototype.keys = b.prototype.values;
        b.prototype[Symbol.iterator] = b.prototype.values;
        b.prototype.forEach = function(a, b) {
            var c = this;
            this.R.forEach(function(d) {
                return a.call(b, d, d, c)
            })
        };
        return b
    });
    pa("Object.is", function(a) {
        return a ? a : function(a, c) {
            return a === c ? 0 !== a || 1 / a === 1 / c : a !== a && c !== c
        }
    });
    pa("Array.prototype.includes", function(a) {
        return a ? a : function(a, c) {
            var b = this;
            b instanceof String && (b = String(b));
            var e = b.length;
            c = c || 0;
            for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
                var f = b[c];
                if (f === a || Object.is(f, a)) return !0
            }
            return !1
        }
    });
    pa("String.prototype.includes", function(a) {
        return a ? a : function(a, c) {
            return -1 !== qa(this, a, "includes").indexOf(a, c || 0)
        }
    });
    var ta = ta || {},
        r = this,
        u = function(a) {
            return void 0 !== a
        },
        v = function(a) {
            return "string" == typeof a
        },
        w = function(a) {
            return "number" == typeof a
        },
        ua = /^[\w+/_-]+[=]{0,2}$/,
        va = null,
        xa = function(a) {
            a = a.split(".");
            for (var b = r, c = 0; c < a.length; c++)
                if (b = b[a[c]], null == b) return null;
            return b
        },
        ya = function() {},
        za = function(a) {
            a.Zg = void 0;
            a.g = function() {
                return a.Zg ? a.Zg : a.Zg = new a
            }
        },
        Aa = function(a) {
            var b = typeof a;
            if ("object" == b)
                if (a) {
                    if (a instanceof Array) return "array";
                    if (a instanceof Object) return b;
                    var c = Object.prototype.toString.call(a);
                    if ("[object Window]" == c) return "object";
                    if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                    if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
                } else return "null";
            else if ("function" == b && "undefined" == typeof a.call) return "object";
            return b
        },
        Ba = function(a) {
            return "array" == Aa(a)
        },
        Ca = function(a) {
            var b =
                Aa(a);
            return "array" == b || "object" == b && "number" == typeof a.length
        },
        x = function(a) {
            return "function" == Aa(a)
        },
        Da = function(a) {
            var b = typeof a;
            return "object" == b && null != a || "function" == b
        },
        Ea = function(a, b, c) {
            return a.call.apply(a.bind, arguments)
        },
        Fa = function(a, b, c) {
            if (!a) throw Error();
            if (2 < arguments.length) {
                var d = Array.prototype.slice.call(arguments, 2);
                return function() {
                    var c = Array.prototype.slice.call(arguments);
                    Array.prototype.unshift.apply(c, d);
                    return a.apply(b, c)
                }
            }
            return function() {
                return a.apply(b, arguments)
            }
        },
        y = function(a, b, c) {
            y = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? Ea : Fa;
            return y.apply(null, arguments)
        },
        Ga = function(a, b) {
            var c = Array.prototype.slice.call(arguments, 1);
            return function() {
                var b = c.slice();
                b.push.apply(b, arguments);
                return a.apply(this, b)
            }
        },
        Ha = Date.now || function() {
            return +new Date
        },
        Ia = function(a, b) {
            a = a.split(".");
            var c = r;
            a[0] in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
            for (var d; a.length && (d = a.shift());) !a.length && u(b) ? c[d] = b :
                c = c[d] && c[d] !== Object.prototype[d] ? c[d] : c[d] = {}
        },
        Ja = function(a, b) {
            function c() {}
            c.prototype = b.prototype;
            a.Ec = b.prototype;
            a.prototype = new c;
            a.prototype.constructor = a;
            a.Tn = function(a, c, f) {
                for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++) d[e - 2] = arguments[e];
                return b.prototype[c].apply(a, d)
            }
        };
    var La = function(a) {
        if (Error.captureStackTrace) Error.captureStackTrace(this, La);
        else {
            var b = Error().stack;
            b && (this.stack = b)
        }
        a && (this.message = String(a))
    };
    Ja(La, Error);
    La.prototype.name = "CustomError";
    var Ma;
    var Na = function(a, b) {
        a = a.split("%s");
        for (var c = "", d = a.length - 1, e = 0; e < d; e++) c += a[e] + (e < b.length ? b[e] : "%s");
        La.call(this, c + a[d])
    };
    Ja(Na, La);
    Na.prototype.name = "AssertionError";
    var Oa = function(a, b, c, d) {
            var e = "Assertion failed";
            if (c) {
                e += ": " + c;
                var f = d
            } else a && (e += ": " + a, f = b);
            throw new Na("" + e, f || []);
        },
        z = function(a, b, c) {
            a || Oa("", null, b, Array.prototype.slice.call(arguments, 2));
            return a
        },
        Pa = function(a, b) {
            throw new Na("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
        },
        Qa = function(a, b, c) {
            w(a) || Oa("Expected number but got %s: %s.", [Aa(a), a], b, Array.prototype.slice.call(arguments, 2));
            return a
        },
        Ra = function(a, b, c) {
            v(a) || Oa("Expected string but got %s: %s.", [Aa(a),
                a
            ], b, Array.prototype.slice.call(arguments, 2))
        },
        Sa = function(a, b, c) {
            x(a) || Oa("Expected function but got %s: %s.", [Aa(a), a], b, Array.prototype.slice.call(arguments, 2))
        },
        Ta = function(a, b, c) {
            Da(a) || Oa("Expected object but got %s: %s.", [Aa(a), a], b, Array.prototype.slice.call(arguments, 2))
        };
    var Ua = Array.prototype.indexOf ? function(a, b) {
            z(null != a.length);
            return Array.prototype.indexOf.call(a, b, void 0)
        } : function(a, b) {
            if (v(a)) return v(b) && 1 == b.length ? a.indexOf(b, 0) : -1;
            for (var c = 0; c < a.length; c++)
                if (c in a && a[c] === b) return c;
            return -1
        },
        A = Array.prototype.forEach ? function(a, b, c) {
            z(null != a.length);
            Array.prototype.forEach.call(a, b, c)
        } : function(a, b, c) {
            for (var d = a.length, e = v(a) ? a.split("") : a, f = 0; f < d; f++) f in e && b.call(c, e[f], f, a)
        },
        Va = Array.prototype.filter ? function(a, b) {
            z(null != a.length);
            return Array.prototype.filter.call(a,
                b, void 0)
        } : function(a, b) {
            for (var c = a.length, d = [], e = 0, f = v(a) ? a.split("") : a, g = 0; g < c; g++)
                if (g in f) {
                    var h = f[g];
                    b.call(void 0, h, g, a) && (d[e++] = h)
                }
            return d
        },
        Wa = Array.prototype.map ? function(a, b) {
            z(null != a.length);
            return Array.prototype.map.call(a, b, void 0)
        } : function(a, b) {
            for (var c = a.length, d = Array(c), e = v(a) ? a.split("") : a, f = 0; f < c; f++) f in e && (d[f] = b.call(void 0, e[f], f, a));
            return d
        },
        Xa = Array.prototype.reduce ? function(a, b, c) {
            z(null != a.length);
            return Array.prototype.reduce.call(a, b, c)
        } : function(a, b, c) {
            var d =
                c;
            A(a, function(c, f) {
                d = b.call(void 0, d, c, f, a)
            });
            return d
        },
        Ya = Array.prototype.some ? function(a, b) {
            z(null != a.length);
            return Array.prototype.some.call(a, b, void 0)
        } : function(a, b) {
            for (var c = a.length, d = v(a) ? a.split("") : a, e = 0; e < c; e++)
                if (e in d && b.call(void 0, d[e], e, a)) return !0;
            return !1
        },
        Za = Array.prototype.every ? function(a, b) {
            z(null != a.length);
            return Array.prototype.every.call(a, b, void 0)
        } : function(a, b) {
            for (var c = a.length, d = v(a) ? a.split("") : a, e = 0; e < c; e++)
                if (e in d && !b.call(void 0, d[e], e, a)) return !1;
            return !0
        },
        $a = function(a, b) {
            var c = 0;
            A(a, function(a, e, f) {
                b.call(void 0, a, e, f) && ++c
            }, void 0);
            return c
        },
        bb = function(a, b) {
            b = ab(a, b, void 0);
            return 0 > b ? null : v(a) ? a.charAt(b) : a[b]
        },
        ab = function(a, b, c) {
            for (var d = a.length, e = v(a) ? a.split("") : a, f = 0; f < d; f++)
                if (f in e && b.call(c, e[f], f, a)) return f;
            return -1
        },
        cb = function(a, b) {
            for (var c = v(a) ? a.split("") : a, d = a.length - 1; 0 <= d; d--)
                if (d in c && b.call(void 0, c[d], d, a)) return d;
            return -1
        },
        eb = function(a, b) {
            b = Ua(a, b);
            var c;
            (c = 0 <= b) && db(a, b);
            return c
        },
        db = function(a, b) {
            z(null != a.length);
            Array.prototype.splice.call(a, b, 1)
        },
        fb = function(a) {
            return Array.prototype.concat.apply([], arguments)
        },
        gb = function(a) {
            var b = a.length;
            if (0 < b) {
                for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
                return c
            }
            return []
        },
        ib = function(a, b) {
            a.sort(b || hb)
        },
        hb = function(a, b) {
            return a > b ? 1 : a < b ? -1 : 0
        },
        jb = function(a) {
            for (var b = [], c = 0; c < a; c++) b[c] = "";
            return b
        };
    var kb = function(a) {
            return /^[\s\xa0]*$/.test(a)
        },
        lb = String.prototype.trim ? function(a) {
            return a.trim()
        } : function(a) {
            return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
        },
        vb = function(a) {
            if (!nb.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(ob, "&amp;")); - 1 != a.indexOf("<") && (a = a.replace(qb, "&lt;")); - 1 != a.indexOf(">") && (a = a.replace(rb, "&gt;")); - 1 != a.indexOf('"') && (a = a.replace(sb, "&quot;")); - 1 != a.indexOf("'") && (a = a.replace(tb, "&#39;")); - 1 != a.indexOf("\x00") && (a = a.replace(ub, "&#0;"));
            return a
        },
        ob = /&/g,
        qb =
        /</g,
        rb = />/g,
        sb = /"/g,
        tb = /'/g,
        ub = /\x00/g,
        nb = /[\x00&<>"']/,
        wb = function(a, b) {
            return -1 != a.toLowerCase().indexOf(b.toLowerCase())
        },
        xb = String.prototype.repeat ? function(a, b) {
            return a.repeat(b)
        } : function(a, b) {
            return Array(b + 1).join(a)
        },
        yb = function(a, b) {
            a = u(void 0) ? a.toFixed(void 0) : String(a);
            var c = a.indexOf("."); - 1 == c && (c = a.length);
            return xb("0", Math.max(0, b - c)) + a
        },
        zb = function(a) {
            return null == a ? "" : String(a)
        },
        Ab = function(a, b) {
            return a < b ? -1 : a > b ? 1 : 0
        },
        Bb = function(a) {
            var b = Number(a);
            return 0 == b && kb(a) ? NaN : b
        },
        Cb = function(a) {
            return String(a).replace(/\-([a-z])/g, function(a, c) {
                return c.toUpperCase()
            })
        },
        Db = function() {
            return "googleAvInapp".replace(/([A-Z])/g, "-$1").toLowerCase()
        },
        Eb = function(a) {
            var b = v(void 0) ? "undefined".replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08") : "\\s";
            return a.replace(new RegExp("(^" + (b ? "|[" + b + "]+" : "") + ")([a-z])", "g"), function(a, b, e) {
                return b + e.toUpperCase()
            })
        };
    var Fb;
    a: {
        var Gb = r.navigator;
        if (Gb) {
            var Hb = Gb.userAgent;
            if (Hb) {
                Fb = Hb;
                break a
            }
        }
        Fb = ""
    }
    var B = function(a) {
        return -1 != Fb.indexOf(a)
    };
    var Ib = function(a, b, c) {
            for (var d in a) b.call(c, a[d], d, a)
        },
        Jb = function(a, b) {
            for (var c in a)
                if (b.call(void 0, a[c], c, a)) return !0;
            return !1
        },
        Kb = function(a) {
            var b = [],
                c = 0,
                d;
            for (d in a) b[c++] = a[d];
            return b
        },
        Lb = function(a) {
            var b = [],
                c = 0,
                d;
            for (d in a) b[c++] = d;
            return b
        },
        Nb = function(a) {
            var b = Mb,
                c;
            for (c in b)
                if (a.call(void 0, b[c], c, b)) return c
        },
        Ob = function(a) {
            for (var b in a) return !1;
            return !0
        },
        Pb = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
        Qb = function(a,
            b) {
            for (var c, d, e = 1; e < arguments.length; e++) {
                d = arguments[e];
                for (c in d) a[c] = d[c];
                for (var f = 0; f < Pb.length; f++) c = Pb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
            }
        };
    var Rb = function() {
        return (B("Chrome") || B("CriOS")) && !B("Edge")
    };
    var Sb = function() {
        return B("iPhone") && !B("iPod") && !B("iPad")
    };
    var Tb = function(a) {
        Tb[" "](a);
        return a
    };
    Tb[" "] = ya;
    var Ub = function(a, b) {
            try {
                return Tb(a[b]), !0
            } catch (c) {}
            return !1
        },
        Wb = function(a, b) {
            var c = Vb;
            return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b(a)
        };
    var Xb = B("Opera"),
        C = B("Trident") || B("MSIE"),
        Yb = B("Edge"),
        Zb = Yb || C,
        $b = B("Gecko") && !(wb(Fb, "WebKit") && !B("Edge")) && !(B("Trident") || B("MSIE")) && !B("Edge"),
        ac = wb(Fb, "WebKit") && !B("Edge"),
        bc = B("Android"),
        cc = Sb() || B("iPad") || B("iPod"),
        dc = function() {
            var a = r.document;
            return a ? a.documentMode : void 0
        },
        ec;
    a: {
        var fc = "",
            gc = function() {
                var a = Fb;
                if ($b) return /rv:([^\);]+)(\)|;)/.exec(a);
                if (Yb) return /Edge\/([\d\.]+)/.exec(a);
                if (C) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
                if (ac) return /WebKit\/(\S+)/.exec(a);
                if (Xb) return /(?:Version)[ \/]?(\S+)/.exec(a)
            }();gc && (fc = gc ? gc[1] : "");
        if (C) {
            var hc = dc();
            if (null != hc && hc > parseFloat(fc)) {
                ec = String(hc);
                break a
            }
        }
        ec = fc
    }
    var kc = ec,
        Vb = {},
        lc = function(a) {
            return Wb(a, function() {
                for (var b = 0, c = lb(String(kc)).split("."), d = lb(String(a)).split("."), e = Math.max(c.length, d.length), f = 0; 0 == b && f < e; f++) {
                    var g = c[f] || "",
                        h = d[f] || "";
                    do {
                        g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
                        h = /(\d*)(\D*)(.*)/.exec(h) || ["", "", "", ""];
                        if (0 == g[0].length && 0 == h[0].length) break;
                        b = Ab(0 == g[1].length ? 0 : parseInt(g[1], 10), 0 == h[1].length ? 0 : parseInt(h[1], 10)) || Ab(0 == g[2].length, 0 == h[2].length) || Ab(g[2], h[2]);
                        g = g[3];
                        h = h[3]
                    } while (0 == b)
                }
                return 0 <= b
            })
        },
        mc;
    var nc = r.document;
    mc = nc && C ? dc() || ("CSS1Compat" == nc.compatMode ? parseInt(kc, 10) : 5) : void 0;
    var oc = !C || 9 <= Number(mc),
        pc = !$b && !C || C && 9 <= Number(mc) || $b && lc("1.9.1"),
        qc = C && !lc("9"),
        sc = C || Xb || ac;
    var tc = function(a, b) {
        var c = (c = a && a.ownerDocument) && (c.defaultView || c.parentWindow) || r;
        "undefined" != typeof c[b] && "undefined" != typeof c.Location && "undefined" != typeof c.Element && (c = a && (a instanceof c[b] || !(a instanceof c.Location || a instanceof c.Element)), a = Da(a) ? a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a) : void 0 === a ? "undefined" : null === a ? "null" : typeof a, z(c, "Argument is not a %s (or a non-Element, non-Location mock); got: %s", b, a))
    };
    var vc = function() {
        this.Hf = "";
        this.Uk = uc
    };
    vc.prototype.Yc = !0;
    vc.prototype.Wc = function() {
        return this.Hf
    };
    vc.prototype.toString = function() {
        return "Const{" + this.Hf + "}"
    };
    var wc = function(a) {
            if (a instanceof vc && a.constructor === vc && a.Uk === uc) return a.Hf;
            Pa("expected object of type Const, got '" + a + "'");
            return "type_error:Const"
        },
        uc = {},
        xc = function(a) {
            var b = new vc;
            b.Hf = a;
            return b
        };
    xc("");
    var zc = function() {
        this.tf = "";
        this.Vk = yc
    };
    zc.prototype.Yc = !0;
    zc.prototype.Wc = function() {
        return this.tf
    };
    zc.prototype.toString = function() {
        return "TrustedResourceUrl{" + this.tf + "}"
    };
    var yc = {};
    var Bc = function() {
        this.Cb = "";
        this.Sk = Ac
    };
    Bc.prototype.Yc = !0;
    Bc.prototype.Wc = function() {
        return this.Cb
    };
    Bc.prototype.toString = function() {
        return "SafeUrl{" + this.Cb + "}"
    };
    var Cc = function(a) {
            if (a instanceof Bc && a.constructor === Bc && a.Sk === Ac) return a.Cb;
            Pa("expected object of type SafeUrl, got '" + a + "' of type " + Aa(a));
            return "type_error:SafeUrl"
        },
        Dc = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,
        Ac = {},
        Ec = function(a) {
            var b = new Bc;
            b.Cb = a;
            return b
        };
    Ec("about:blank");
    var Gc = function() {
        this.Cb = "";
        this.Rk = Fc
    };
    Gc.prototype.Yc = !0;
    Gc.prototype.Wc = function() {
        return this.Cb
    };
    Gc.prototype.toString = function() {
        return "SafeHtml{" + this.Cb + "}"
    };
    var Hc = function(a) {
            if (a instanceof Gc && a.constructor === Gc && a.Rk === Fc) return a.Cb;
            Pa("expected object of type SafeHtml, got '" + a + "' of type " + Aa(a));
            return "type_error:SafeHtml"
        },
        Fc = {};
    Gc.prototype.Tl = function(a) {
        this.Cb = a;
        return this
    };
    var Ic = function(a, b) {
        tc(a, "HTMLAnchorElement");
        b instanceof Bc || b instanceof Bc || (b = b.Yc ? b.Wc() : String(b), z(Dc.test(b)) || (b = "about:invalid#zClosurez"), b = Ec(b));
        a.href = Cc(b)
    };
    var D = function(a, b) {
        this.x = u(a) ? a : 0;
        this.y = u(b) ? b : 0
    };
    D.prototype.clone = function() {
        return new D(this.x, this.y)
    };
    D.prototype.toString = function() {
        return "(" + this.x + ", " + this.y + ")"
    };
    D.prototype.Bd = function(a) {
        return a instanceof D && Jc(this, a)
    };
    var Jc = function(a, b) {
        return a == b ? !0 : a && b ? a.x == b.x && a.y == b.y : !1
    };
    l = D.prototype;
    l.ceil = function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    };
    l.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    };
    l.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    };
    l.translate = function(a, b) {
        a instanceof D ? (this.x += a.x, this.y += a.y) : (this.x += Number(a), w(b) && (this.y += b));
        return this
    };
    l.scale = function(a, b) {
        b = w(b) ? b : a;
        this.x *= a;
        this.y *= b;
        return this
    };
    var E = function(a, b) {
            this.width = a;
            this.height = b
        },
        Kc = function(a, b) {
            return a == b ? !0 : a && b ? a.width == b.width && a.height == b.height : !1
        };
    l = E.prototype;
    l.clone = function() {
        return new E(this.width, this.height)
    };
    l.toString = function() {
        return "(" + this.width + " x " + this.height + ")"
    };
    l.Hb = function() {
        return this.width * this.height
    };
    l.aspectRatio = function() {
        return this.width / this.height
    };
    l.ceil = function() {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    };
    l.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    l.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    l.scale = function(a, b) {
        b = w(b) ? b : a;
        this.width *= a;
        this.height *= b;
        return this
    };
    var Nc = function(a) {
            return a ? new Lc(Mc(a)) : Ma || (Ma = new Lc)
        },
        Pc = function(a, b) {
            Ib(b, function(b, d) {
                b && b.Yc && (b = b.Wc());
                "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : Oc.hasOwnProperty(d) ? a.setAttribute(Oc[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b
            })
        },
        Oc = {
            cellpadding: "cellPadding",
            cellspacing: "cellSpacing",
            colspan: "colSpan",
            frameborder: "frameBorder",
            height: "height",
            maxlength: "maxLength",
            nonce: "nonce",
            role: "role",
            rowspan: "rowSpan",
            type: "type",
            usemap: "useMap",
            valign: "vAlign",
            width: "width"
        },
        Rc = function(a) {
            var b = a.scrollingElement ? a.scrollingElement : ac || "CSS1Compat" != a.compatMode ? a.body || a.documentElement : a.documentElement;
            a = Qc(a);
            return C && lc("10") && a.pageYOffset != b.scrollTop ? new D(b.scrollLeft, b.scrollTop) : new D(a.pageXOffset || b.scrollLeft, a.pageYOffset || b.scrollTop)
        },
        Qc = function(a) {
            return a.parentWindow || a.defaultView
        },
        Tc = function(a, b, c) {
            var d = arguments,
                e = document,
                f = String(d[0]),
                g = d[1];
            if (!oc && g && (g.name || g.type)) {
                f = ["<", f];
                g.name && f.push(' name="', vb(g.name), '"');
                if (g.type) {
                    f.push(' type="', vb(g.type), '"');
                    var h = {};
                    Qb(h, g);
                    delete h.type;
                    g = h
                }
                f.push(">");
                f = f.join("")
            }
            f = e.createElement(f);
            g && (v(g) ? f.className = g : Ba(g) ? f.className = g.join(" ") : Pc(f, g));
            2 < d.length && Sc(e, f, d, 2);
            return f
        },
        Sc = function(a, b, c, d) {
            function e(c) {
                c && b.appendChild(v(c) ? a.createTextNode(c) : c)
            }
            for (; d < c.length; d++) {
                var f = c[d];
                !Ca(f) || Da(f) && 0 < f.nodeType ? e(f) : A(Uc(f) ? gb(f) : f, e)
            }
        },
        Vc = function(a) {
            return a && a.parentNode ? a.parentNode.removeChild(a) : null
        },
        F =
        function(a) {
            return pc && void 0 != a.children ? a.children : Va(a.childNodes, function(a) {
                return 1 == a.nodeType
            })
        },
        Wc = function(a) {
            var b;
            if (sc && !(C && lc("9") && !lc("10") && r.SVGElement && a instanceof r.SVGElement) && (b = a.parentElement)) return b;
            b = a.parentNode;
            return Da(b) && 1 == b.nodeType ? b : null
        },
        Mc = function(a) {
            z(a, "Node cannot be null or undefined.");
            return 9 == a.nodeType ? a : a.ownerDocument || a.document
        },
        Xc = {
            SCRIPT: 1,
            STYLE: 1,
            HEAD: 1,
            IFRAME: 1,
            OBJECT: 1
        },
        Yc = {
            IMG: " ",
            BR: "\n"
        },
        $c = function(a) {
            if (qc && null !== a && "innerText" in
                a) a = a.innerText.replace(/(\r\n|\r|\n)/g, "\n");
            else {
                var b = [];
                Zc(a, b, !0);
                a = b.join("")
            }
            a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
            a = a.replace(/\u200B/g, "");
            qc || (a = a.replace(/ +/g, " "));
            " " != a && (a = a.replace(/^\s*/, ""));
            return a
        },
        Zc = function(a, b, c) {
            if (!(a.nodeName in Xc))
                if (3 == a.nodeType) c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue);
                else if (a.nodeName in Yc) b.push(Yc[a.nodeName]);
            else
                for (a = a.firstChild; a;) Zc(a, b, c), a = a.nextSibling
        },
        Uc = function(a) {
            if (a && "number" == typeof a.length) {
                if (Da(a)) return "function" ==
                    typeof a.item || "string" == typeof a.item;
                if (x(a)) return "function" == typeof a.item
            }
            return !1
        },
        ad = function(a, b) {
            a && (a = a.parentNode);
            for (var c = 0; a;) {
                z("parentNode" != a.name);
                if (b(a)) return a;
                a = a.parentNode;
                c++
            }
            return null
        },
        Lc = function(a) {
            this.ec = a || r.document || document
        };
    l = Lc.prototype;
    l.getElementsByTagName = function(a, b) {
        return (b || this.ec).getElementsByTagName(String(a))
    };
    l.createElement = function(a) {
        return this.ec.createElement(String(a))
    };
    l.createTextNode = function(a) {
        return this.ec.createTextNode(String(a))
    };
    l.Ve = function() {
        return Qc(this.ec)
    };
    l.appendChild = function(a, b) {
        a.appendChild(b)
    };
    l.append = function(a, b) {
        Sc(Mc(a), a, arguments, 1)
    };
    l.canHaveChildren = function(a) {
        if (1 != a.nodeType) return !1;
        switch (a.tagName) {
            case "APPLET":
            case "AREA":
            case "BASE":
            case "BR":
            case "COL":
            case "COMMAND":
            case "EMBED":
            case "FRAME":
            case "HR":
            case "IMG":
            case "INPUT":
            case "IFRAME":
            case "ISINDEX":
            case "KEYGEN":
            case "LINK":
            case "NOFRAMES":
            case "NOSCRIPT":
            case "META":
            case "OBJECT":
            case "PARAM":
            case "SCRIPT":
            case "SOURCE":
            case "STYLE":
            case "TRACK":
            case "WBR":
                return !1
        }
        return !0
    };
    l.removeNode = Vc;
    l.dj = F;
    l.contains = function(a, b) {
        if (!a || !b) return !1;
        if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition) return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b;) b = b.parentNode;
        return b == a
    };
    var G = function(a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    };
    l = G.prototype;
    l.getWidth = function() {
        return this.right - this.left
    };
    l.getHeight = function() {
        return this.bottom - this.top
    };
    l.clone = function() {
        return new G(this.top, this.right, this.bottom, this.left)
    };
    l.toString = function() {
        return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
    };
    l.contains = function(a) {
        return this && a ? a instanceof G ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
    };
    l.expand = function(a, b, c, d) {
        Da(a) ? (this.top -= a.top, this.right += a.right, this.bottom += a.bottom, this.left -= a.left) : (this.top -= a, this.right += Number(b), this.bottom += Number(c), this.left -= Number(d));
        return this
    };
    var bd = function(a, b) {
        return a == b ? !0 : a && b ? a.top == b.top && a.right == b.right && a.bottom == b.bottom && a.left == b.left : !1
    };
    l = G.prototype;
    l.ceil = function() {
        this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left);
        return this
    };
    l.floor = function() {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    };
    l.round = function() {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    };
    l.translate = function(a, b) {
        a instanceof D ? (this.left += a.x, this.right += a.x, this.top += a.y, this.bottom += a.y) : (Qa(a), this.left += a, this.right += a, w(b) && (this.top += b, this.bottom += b));
        return this
    };
    l.scale = function(a, b) {
        b = w(b) ? b : a;
        this.left *= a;
        this.right *= a;
        this.top *= b;
        this.bottom *= b;
        return this
    };
    var cd = function(a) {
            return function() {
                return a
            }
        },
        dd = function(a) {
            var b = !1,
                c;
            return function() {
                b || (c = a(), b = !0);
                return c
            }
        };
    var ed = function(a) {
            try {
                return !!a && null != a.location.href && Ub(a, "foo")
            } catch (b) {
                return !1
            }
        },
        fd = function(a, b) {
            if (a)
                for (var c in a) Object.prototype.hasOwnProperty.call(a, c) && b.call(void 0, a[c], c, a)
        },
        gd = /https?:\/\/[^\/]+/,
        hd = function(a) {
            return (a = gd.exec(a)) && a[0] || ""
        },
        jd = function() {
            var a = id;
            if (!a) return "";
            var b = /.*[&#?]google_debug(=[^&]*)?(&.*)?$/;
            try {
                var c = b.exec(decodeURIComponent(a));
                if (c) return c[1] && 1 < c[1].length ? c[1].substring(1) : "true"
            } catch (d) {}
            return ""
        };
    var kd = function(a, b, c) {
        a && null !== b && b != b.top && (b = b.top);
        try {
            if (void 0 === c ? 0 : c) var d = (new E(b.innerWidth, b.innerHeight)).round();
            else {
                var e = (b || window).document,
                    f = "CSS1Compat" == e.compatMode ? e.documentElement : e.body;
                d = (new E(f.clientWidth, f.clientHeight)).round()
            }
            return d
        } catch (g) {
            return new E(-12245933, -12245933)
        }
    };
    var ld = document,
        H = window;
    var md = {
            NONE: 0,
            tn: 1
        },
        nd = {
            Qn: 1
        };
    var od = function() {
            this.A = 0;
            this.If = !1;
            this.De = -1;
            this.Pb = !1
        },
        pd = function(a) {
            return a.Pb ? .3 <= a.A : .5 <= a.A
        };
    var I = {
            Gk: 0,
            un: 1
        },
        qd = {
            Gn: 0,
            Dn: 1,
            En: 2
        },
        rd = {
            Gk: 0,
            xn: 1,
            wn: 2
        };
    var sd = function(a) {
        this.Zl = a;
        this.ba = null;
        this.fa = !1
    };
    sd.prototype.Kd = function() {
        return this.ba
    };
    var td = function() {
        this.wb = {};
        this.Ae = !0;
        this.Gd = {}
    };
    td.prototype.disable = function() {
        this.Ae = !1
    };
    td.prototype.enable = function() {
        this.Ae = !0
    };
    td.prototype.isEnabled = function() {
        return this.Ae
    };
    td.prototype.reset = function() {
        this.wb = {};
        this.Ae = !0;
        this.Gd = {}
    };
    var J = function(a, b, c) {
            a.wb[b] || (a.wb[b] = new sd(c));
            return a.wb[b]
        },
        ud = function(a, b, c) {
            if (a = a.wb[b]) {
                if (b = null === a.ba) b: {
                    b = a.Zl;
                    for (var d in b)
                        if (b[d] == c) {
                            b = !0;
                            break b
                        }
                    b = !1
                }
                b && (a.ba = c)
            }
        },
        K = function(a, b) {
            var c = a.Gd;
            if (null !== c && b in c) return a.Gd[b];
            if (a = a.wb[b]) return a.Kd()
        },
        vd = function(a) {
            var b = {},
                c;
            for (c in a.wb)
                if (a.wb.hasOwnProperty(c)) {
                    if (void 0 !== a.Gd[c]) var d = String(a.Gd[c]);
                    else d = a.wb[c], d = d.fa && null !== d.ba ? String(d.ba) : "";
                    0 < d.length && (b[c] = d)
                }
            return b
        },
        wd = function(a) {
            a = vd(a);
            var b = [];
            Ib(a,
                function(a, d) {
                    d in Object.prototype || "undefined" != typeof a && b.push([d, ":", a].join(""))
                });
            return b
        };
    var xd = function(a, b) {
            this.pb = (void 0 === a ? 0 : a) || 0;
            this.bb = (void 0 === b ? "" : b) || ""
        },
        yd = function(a) {
            return !!a.pb || !!a.bb
        };
    xd.prototype.toString = function() {
        return this.pb + (this.bb ? "-" : "") + this.bb
    };
    xd.prototype.matches = function(a) {
        return this.bb || a.bb ? this.bb == a.bb : this.pb || a.pb ? this.pb == a.pb : !1
    };
    var zd = function(a) {
        return Wa(a, function(a) {
            a = a.toString(16);
            return 1 < a.length ? a : "0" + a
        }).join("")
    };
    var Ad = B("Android") && !(Rb() || B("Firefox") || B("Opera") || B("Silk"));
    var Bd = null,
        Cd = null;
    Object.freeze && Object.freeze([]);
    var Ed = function(a, b, c) {
            if (v(b))(b = Dd(a, b)) && (a.style[b] = c);
            else
                for (var d in b) {
                    c = a;
                    var e = b[d],
                        f = Dd(c, d);
                    f && (c.style[f] = e)
                }
        },
        Fd = {},
        Dd = function(a, b) {
            var c = Fd[b];
            if (!c) {
                var d = Cb(b);
                c = d;
                void 0 === a.style[d] && (d = (ac ? "Webkit" : $b ? "Moz" : C ? "ms" : Xb ? "O" : null) + Eb(d), void 0 !== a.style[d] && (c = d));
                Fd[b] = c
            }
            return c
        },
        Gd = function(a, b) {
            var c = a.style[Cb(b)];
            return "undefined" !== typeof c ? c : a.style[Dd(a, b)] || ""
        },
        Hd = function(a) {
            try {
                var b = a.getBoundingClientRect()
            } catch (c) {
                return {
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                }
            }
            C && a.ownerDocument.body &&
                (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
            return b
        },
        Id = function(a, b) {
            var c = new D(0, 0);
            var d = (d = Mc(a)) ? Qc(d) : window;
            if (!Ub(d, "parent")) return c;
            do {
                if (d == b) {
                    var e = a,
                        f = Mc(e);
                    Ta(e, "Parameter is required");
                    var g = new D(0, 0);
                    var h = f ? Mc(f) : document;
                    h = !C || 9 <= Number(mc) || "CSS1Compat" == Nc(h).ec.compatMode ? h.documentElement : h.body;
                    e != h && (e = Hd(e), f = Rc(Nc(f).ec), g.x = e.left + f.x, g.y = e.top + f.y)
                } else g = z(a), g = Hd(g), g = new D(g.left,
                    g.top);
                c.x += g.x;
                c.y += g.y
            } while (d && d != b && d != d.parent && (a = d.frameElement) && (d = d.parent));
            return c
        },
        Kd = function(a, b, c) {
            if (b instanceof E) c = b.height, b = b.width;
            else if (void 0 == c) throw Error("missing height argument");
            a.style.width = Jd(b);
            a.style.height = Jd(c)
        },
        Jd = function(a) {
            "number" == typeof a && (a = Math.round(a) + "px");
            return a
        };
    var Ld = dd(function() {
        var a = !1;
        try {
            var b = Object.defineProperty({}, "passive", {
                get: function() {
                    a = !0
                }
            });
            r.addEventListener("test", null, b)
        } catch (c) {}
        return a
    });

    function Md(a) {
        return a ? a.passive && Ld() ? a : a.capture || !1 : a
    }
    var Nd = function(a, b, c, d) {
            a.addEventListener ? a.addEventListener(b, c, Md(d)) : a.attachEvent && a.attachEvent("on" + b, c)
        },
        Od = function(a, b, c) {
            a.removeEventListener ? a.removeEventListener(b, c, Md(void 0)) : a.detachEvent && a.detachEvent("on" + b, c)
        };
    var Pd = function(a) {
        a = void 0 === a ? r : a;
        var b = a.context;
        if (!b) try {
            b = a.parent.context
        } catch (c) {}
        try {
            if (b && b.pageViewId && b.canonicalUrl) return b
        } catch (c) {}
        return null
    };
    var Qd = function(a, b) {
        var c = !1,
            d = !1;
        d = void 0 === d ? !1 : d;
        c = void 0 === c ? !1 : c;
        a.google_image_requests || (a.google_image_requests = []);
        var e = a.document.createElement("img");
        if (c) {
            var f = function() {
                c && eb(a.google_image_requests, e);
                Od(e, "load", f);
                Od(e, "error", f)
            };
            Nd(e, "load", f);
            Nd(e, "error", f)
        }
        d && (e.referrerPolicy = "no-referrer");
        e.src = b;
        a.google_image_requests.push(e)
    };
    var Rd = !!window.google_async_iframe_id,
        Sd = Rd && window.parent || window,
        Td = function() {
            if (Rd && !ed(Sd)) {
                var a = "." + ld.domain;
                try {
                    for (; 2 < a.split(".").length && !ed(Sd);) ld.domain = a = a.substr(a.indexOf(".") + 1), Sd = window.parent
                } catch (b) {}
                ed(Sd) || (Sd = window)
            }
            return Sd
        };
    var Ud = function(a, b, c) {
        c = void 0 === c ? {} : c;
        this.error = a;
        this.context = b.context;
        this.line = b.line || -1;
        this.msg = b.message || "";
        this.file = b.file || "";
        this.id = b.id || "jserror";
        this.meta = c
    };
    var Vd = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/,
        Wd = function(a, b) {
            if (a) {
                a = a.split("&");
                for (var c = 0; c < a.length; c++) {
                    var d = a[c].indexOf("="),
                        e = null;
                    if (0 <= d) {
                        var f = a[c].substring(0, d);
                        e = a[c].substring(d + 1)
                    } else f = a[c];
                    b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "")
                }
            }
        };
    var Xd = /^https?:\/\/(\w|-)+\.cdn\.ampproject\.(net|org)(\?|\/|$)/,
        ae = function(a) {
            a = a || Yd();
            for (var b = new Zd(r.location.href, r, !1), c = null, d = a.length - 1, e = d; 0 <= e; --e) {
                var f = a[e];
                !c && Xd.test(f.url) && (c = f);
                if (f.url && !f.bh) {
                    b = f;
                    break
                }
            }
            e = null;
            f = a.length && a[d].url;
            0 != b.depth && f && (e = a[d]);
            return new $d(b, e, c)
        },
        Yd = function() {
            var a = r,
                b = [],
                c = null;
            do {
                var d = a;
                if (ed(d)) {
                    var e = d.location.href;
                    c = d.document && d.document.referrer || null
                } else e = c, c = null;
                b.push(new Zd(e || "", d));
                try {
                    a = d.parent
                } catch (f) {
                    a = null
                }
            } while (a &&
                d != a);
            d = 0;
            for (a = b.length - 1; d <= a; ++d) b[d].depth = a - d;
            d = r;
            if (d.location && d.location.ancestorOrigins && d.location.ancestorOrigins.length == b.length - 1)
                for (a = 1; a < b.length; ++a) e = b[a], e.url || (e.url = d.location.ancestorOrigins[a - 1] || "", e.bh = !0);
            return b
        },
        $d = function(a, b, c) {
            this.ei = a;
            this.fi = b;
            this.ml = c
        },
        Zd = function(a, b, c) {
            this.url = a;
            this.ca = b;
            this.bh = !!c;
            this.depth = w(void 0) ? void 0 : null
        };
    var be = function() {
            this.Cj = 4E3;
            this.Zd = "&";
            this.nl = ",$";
            this.Mf = u(void 0) ? void 0 : "trn";
            this.Xm = null;
            this.Ei = !1;
            this.Gb = {};
            this.nm = 0;
            this.Mc = []
        },
        ce = function(a, b) {
            var c = {};
            c[a] = b;
            return [c]
        },
        ee = function(a, b, c, d, e) {
            var f = [];
            fd(a, function(a, h) {
                (a = de(a, b, c, d, e)) && f.push(h + "=" + a)
            });
            return f.join(b)
        },
        de = function(a, b, c, d, e) {
            if (null == a) return "";
            b = b || "&";
            c = c || ",$";
            "string" == typeof c && (c = c.split(""));
            if (a instanceof Array) {
                if (d = d || 0, d < c.length) {
                    for (var f = [], g = 0; g < a.length; g++) f.push(de(a[g], b, c, d + 1, e));
                    return f.join(c[d])
                }
            } else if ("object" ==
                typeof a) return e = e || 0, 2 > e ? encodeURIComponent(ee(a, b, c, d, e + 1)) : "...";
            return encodeURIComponent(String(a))
        },
        fe = function(a, b, c, d) {
            z(!a.Gb[b]);
            a.Mc.push(b);
            a.Gb[b] = ce(c, d)
        };
    be.prototype.Jd = function(a, b, c, d) {
        a = a + "//" + b + c;
        var e = ge(this) - c.length - d.length;
        if (0 > e) return "";
        this.Mc.sort(function(a, b) {
            return a - b
        });
        c = null;
        b = "";
        for (var f = 0; f < this.Mc.length; f++)
            for (var g = this.Mc[f], h = this.Gb[g], k = 0; k < h.length; k++) {
                if (!e) {
                    c = null == c ? g : c;
                    break
                }
                var m = ee(h[k], this.Zd, this.nl);
                if (m) {
                    m = b + m;
                    if (e >= m.length) {
                        e -= m.length;
                        a += m;
                        b = this.Zd;
                        break
                    } else this.Ei && (b = e, m[b - 1] == this.Zd && --b, a += m.substr(0, b), b = this.Zd, e = 0);
                    c = null == c ? g : c
                }
            }
        f = "";
        this.Mf && null != c && (f = b + this.Mf + "=" + (this.Xm || c));
        return a +
            f + d
    };
    var ge = function(a) {
        if (!a.Mf) return a.Cj;
        var b = 1,
            c;
        for (c in a.Gb) b = c.length > b ? c.length : b;
        return a.Cj - a.Mf.length - b - a.Zd.length - 1
    };
    var he = function(a, b, c, d, e) {
        if ((d ? a.$h : Math.random()) < (e || a.vl)) try {
            if (c instanceof be) var f = c;
            else f = new be, fd(c, function(a, b) {
                var c = f,
                    d = c.nm++;
                a = ce(b, a);
                z(!c.Gb[d]);
                c.Mc.push(d);
                c.Gb[d] = a
            });
            var g = f.Jd(a.Lh, a.ea, a.$ + b + "&", "");
            g && Qd(r, g)
        } catch (h) {}
    };
    var ie = null;
    var je = function() {
            var a = r.performance;
            return a && a.now && a.timing ? Math.floor(a.now() + a.timing.navigationStart) : Ha()
        },
        ke = function() {
            var a = void 0 === a ? r : a;
            return (a = a.performance) && a.now ? a.now() : null
        };
    var le = function(a, b, c, d, e) {
        this.label = a;
        this.type = b;
        this.value = c;
        this.duration = void 0 === d ? 0 : d;
        this.uniqueId = this.label + "_" + this.type + "_" + Math.random();
        this.slotId = e
    };
    var me = r.performance,
        ne = !!(me && me.mark && me.measure && me.clearMarks),
        oe = dd(function() {
            var a;
            if (a = ne) {
                var b;
                if (null === ie) {
                    ie = "";
                    try {
                        a = "";
                        try {
                            a = r.top.location.hash
                        } catch (c) {
                            a = r.location.hash
                        }
                        a && (ie = (b = a.match(/\bdeid=([\d,]+)/)) ? b[1] : "")
                    } catch (c) {}
                }
                b = ie;
                a = !!b.indexOf && 0 <= b.indexOf("1337")
            }
            return a
        }),
        pe = function(a, b) {
            this.jc = [];
            this.J = b || r;
            var c = null;
            b && (b.google_js_reporting_queue = b.google_js_reporting_queue || [], this.jc = b.google_js_reporting_queue, c = b.google_measure_js_timing);
            this.tb = oe() || (null != c ?
                c : Math.random() < a)
        };
    pe.prototype.disable = function() {
        this.tb = !1;
        this.jc != this.J.google_js_reporting_queue && (oe() && A(this.jc, qe), this.jc.length = 0)
    };
    pe.prototype.yf = function(a) {
        this.tb && this.jc.push(a)
    };
    var qe = function(a) {
        a && me && oe() && (me.clearMarks("goog_" + a.uniqueId + "_start"), me.clearMarks("goog_" + a.uniqueId + "_end"))
    };
    pe.prototype.start = function(a, b) {
        if (!this.tb) return null;
        var c = ke() || je();
        a = new le(a, b, c);
        b = "goog_" + a.uniqueId + "_start";
        me && oe() && me.mark(b);
        return a
    };
    pe.prototype.end = function(a) {
        if (this.tb && (z(a), w(a.value))) {
            var b = ke() || je();
            a.duration = b - a.value;
            b = "goog_" + a.uniqueId + "_end";
            me && oe() && me.mark(b);
            this.yf(a)
        }
    };
    var te = function() {
        var a = re;
        this.Sj = se;
        this.Pe = "jserror";
        this.Dc = !1;
        this.Lc = null;
        this.yl = this.Qb;
        this.H = void 0 === a ? null : a;
        this.Pf = !1
    };
    te.prototype.lk = function(a) {
        this.Dc = a
    };
    te.prototype.vf = function(a, b, c, d) {
        try {
            if (this.H && this.H.tb) {
                var e = this.H.start(a.toString(), 3);
                var f = b();
                this.H.end(e)
            } else f = b()
        } catch (h) {
            b = this.Dc;
            try {
                qe(e);
                var g = ue(h);
                b = (d || this.yl).call(this, a, g, void 0, c)
            } catch (k) {
                this.Qb(217, k)
            }
            if (!b) throw h;
        }
        return f
    };
    te.prototype.Wj = function(a, b, c, d, e) {
        var f = this;
        return function(g) {
            for (var h = [], k = 0; k < arguments.length; ++k) h[k - 0] = arguments[k];
            return f.vf(a, function() {
                return b.apply(c, h)
            }, d, e)
        }
    };
    te.prototype.Qb = function(a, b, c, d, e) {
        e = e || this.Pe;
        try {
            var f = new be;
            f.Ei = !0;
            fe(f, 1, "context", a);
            b.error && b.meta && b.id || (b = ue(b));
            b.msg && fe(f, 2, "msg", b.msg.substring(0, 512));
            b.file && fe(f, 3, "file", b.file);
            0 < b.line && fe(f, 4, "line", b.line);
            var g = b.meta || {};
            if (this.Lc) try {
                this.Lc(g)
            } catch (k) {}
            if (d) try {
                d(g)
            } catch (k) {}
            b = [g];
            z(!f.Gb[5]);
            f.Mc.push(5);
            f.Gb[5] = b;
            var h = ae();
            h.fi && fe(f, 6, "top", h.fi.url || "");
            fe(f, 7, "url", h.ei.url || "");
            he(this.Sj, e, f, this.Pf, c)
        } catch (k) {
            try {
                he(this.Sj, e, {
                    context: "ecmserr",
                    rctx: a,
                    msg: ve(k),
                    url: h && h.ei.url
                }, this.Pf, c)
            } catch (m) {}
        }
        return this.Dc
    };
    var ue = function(a) {
            return new we(ve(a), a.fileName, a.lineNumber)
        },
        ve = function(a) {
            var b = a.toString();
            a.name && -1 == b.indexOf(a.name) && (b += ": " + a.name);
            a.message && -1 == b.indexOf(a.message) && (b += ": " + a.message);
            if (a.stack) {
                a = a.stack;
                var c = b;
                try {
                    -1 == a.indexOf(c) && (a = c + "\n" + a);
                    for (var d; a != d;) d = a, a = a.replace(/((https?:\/..*\/)[^\/:]*:\d+(?:.|\n)*)\2/, "$1");
                    b = a.replace(/\n */g, "\n")
                } catch (e) {
                    b = c
                }
            }
            return b
        },
        we = function(a, b, c) {
            Ud.call(this, Error(a), {
                message: a,
                file: void 0 === b ? "" : b,
                line: void 0 === c ? -1 : c
            })
        };
    q(we, Ud);
    var xe = function() {
        this.H = null;
        this.Pe = "jserror";
        this.Dc = !0;
        this.Lc = null;
        this.Pf = !1;
        this.$h = Math.random();
        this.Si = .01
    };
    xe.prototype.lk = function(a) {
        this.Dc = a
    };
    xe.prototype.Qb = function(a, b, c, d, e) {
        c = void 0 === c ? this.Si : c;
        e = void 0 === e ? this.Pe : e;
        if ((this.Pf ? this.$h : Math.random()) > c) return this.Dc;
        b.error && b.meta && b.id || (b = new Ud(b, {
            context: a,
            id: e
        }));
        if (d || this.Lc) b.meta = {}, this.Lc && this.Lc(b.meta), d && d(b.meta);
        r.google_js_errors = r.google_js_errors || [];
        r.google_js_errors.push(b);
        if (!r.error_rep_loaded) {
            b = r.document;
            a = b.createElement("script");
            c = new zc;
            c.tf = r.location.protocol + "//pagead2.googlesyndication.com/pagead/js/err_rep.js";
            tc(a, "HTMLScriptElement");
            c instanceof
            zc && c.constructor === zc && c.Vk === yc ? c = c.tf : (Pa("expected object of type TrustedResourceUrl, got '" + c + "' of type " + Aa(c)), c = "type_error:TrustedResourceUrl");
            a.src = c;
            if (null === va) {
                b: {
                    if ((c = r.document.querySelector("script[nonce]")) && (c = c.nonce || c.getAttribute("nonce")) && ua.test(c)) break b;c = null
                }
                va = c || ""
            }
            if (c = va) a.nonce = c;
            (b = b.getElementsByTagName("script")[0]) && b.parentNode && b.parentNode.insertBefore(a, b);
            r.error_rep_loaded = !0
        }
        return this.Dc
    };
    xe.prototype.vf = function(a, b, c, d) {
        d = void 0 === d ? this.Qb : d;
        try {
            var e = this.H && this.H.start(String(a), 3);
            var f = b();
            this.H && e && this.H.end(e)
        } catch (g) {
            if (this.H && e && qe(e), !d.call(this, a, g, this.Si, c, this.Pe)) throw g;
        }
        return f
    };
    xe.prototype.Wj = function(a, b, c, d, e) {
        var f = this;
        e = void 0 === e ? this.Qb : e;
        Sa(b);
        return function(g) {
            for (var h = [], k = 0; k < arguments.length; ++k) h[k - 0] = arguments[k];
            return f.vf(a, function() {
                return b.apply(c, h)
            }, d, e)
        }
    };
    var se, ye, ze = Td(),
        re = new pe(1, ze);
    se = new function() {
        var a = void 0 === a ? H : a;
        this.Lh = "http:" === a.location.protocol ? "http:" : "https:";
        this.ea = "pagead2.googlesyndication.com";
        this.$ = "/pagead/gen_204?id=";
        this.vl = .01;
        this.$h = Math.random()
    };
    ye = new te;
    "complete" == ze.document.readyState ? ze.google_measure_js_timing || re.disable() : re.tb && Nd(ze, "load", function() {
        ze.google_measure_js_timing || re.disable()
    });
    var Be = function(a, b) {
            return ye.vf(a, b, void 0, Ae)
        },
        Ce = function(a, b, c, d) {
            return ye.Wj(a, b, c, d, void 0)
        },
        Ae = ye.Qb,
        De = function(a, b) {
            ye.Qb(a, b, void 0, void 0)
        };
    if (ld && ld.URL) {
        var Ee, id = ld.URL;
        Ee = !!id && 0 < jd().length;
        ye.lk(!Ee)
    }
    var Fe = function(a, b, c, d) {
        var e = void 0 === e ? !1 : e;
        c = Ce(d, c);
        Nd(a, b, c, {
            capture: e
        });
        return c
    };
    var Ge = function(a, b) {
            a && (a.pb && (b[4] = a.pb), a.bb && (b[12] = a.bb))
        },
        He = function(a) {
            var b = [];
            Ib(a, function(a, d) {
                d = encodeURIComponent(d);
                v(a) && (a = encodeURIComponent(a));
                b.push(d + "=" + a)
            });
            b.push("24=" + Ha());
            return b.join("\n")
        };
    var Ie = !C && !(B("Safari") && !(Rb() || B("Coast") || B("Opera") || B("Edge") || B("Silk") || B("Android")));
    var Je = function() {
        return {
            visible: 1,
            hidden: 2,
            prerender: 3,
            preview: 4,
            unloaded: 5
        } [ld.visibilityState || ld.webkitVisibilityState || ld.mozVisibilityState || ""] || 0
    };

    function Ke(a, b, c, d) {
        if (!a) return {
            value: d,
            done: !1
        };
        d = b(d, a);
        var e = c(d, a);
        return !e && Ub(a, "parentElement") ? Ke(Wc(a), b, c, d) : {
            done: e,
            value: d
        }
    }
    var Le = function(a, b, c, d) {
        if (!a) return d;
        d = Ke(a, b, c, d);
        if (!d.done) try {
            var e = Mc(a),
                f = e && (e ? Qc(e) : window);
            return Le(f && f.frameElement, b, c, d.value)
        } catch (g) {}
        return d.value
    };

    function Me(a) {
        var b = !C || lc(8);
        return Le(a, function(a, d) {
            a = Ub(d, "style") && d.style && Gd(d, "visibility");
            return {
                hidden: "hidden" === a,
                visible: b && "visible" === a
            }
        }, function(a) {
            return a.hidden || a.visible
        }, {
            hidden: !1,
            visible: !1
        }).hidden
    }
    var Ne = function(a) {
            return Le(a, function(a, c) {
                return !(!Ub(c, "style") || !c.style || "none" !== Gd(c, "display"))
            }, function(a) {
                return a
            }, !1) ? !0 : Me(a)
        },
        Oe = function(a) {
            return new G(a.top, a.right, a.bottom, a.left)
        },
        Pe = function(a) {
            return null != a && 0 <= a && 1 >= a
        },
        Qe = function() {
            var a = Je();
            return 0 == a ? -1 : 1 == a ? 0 : 1
        },
        Re = function(a, b) {
            b = void 0 === b ? H : b;
            null !== b && b != b.top && (b = b.top);
            var c = 0,
                d = 0;
            try {
                var e = b.document,
                    f = e.body,
                    g = e.documentElement;
                if ("CSS1Compat" == e.compatMode && g.scrollHeight) c = g.scrollHeight != a.height ? g.scrollHeight :
                    g.offsetHeight, d = g.scrollWidth != a.width ? g.scrollWidth : g.offsetWidth;
                else {
                    var h = g.scrollHeight,
                        k = g.scrollWidth,
                        m = g.offsetHeight,
                        n = g.offsetWidth;
                    g.clientHeight != m && (h = f.scrollHeight, k = f.scrollWidth, m = f.offsetHeight, n = f.offsetWidth);
                    h > a.height ? h > m ? (c = h, d = k) : (c = m, d = n) : h < m ? (c = h, d = k) : (c = m, d = n)
                }
                return new E(d, c)
            } catch (t) {
                return new E(-12245933, -12245933)
            }
        };
    var Se = function(a, b, c, d, e, f) {
        this.time = a;
        this.Oc = b;
        this.de = c;
        this.dc = d;
        this.Hd = e;
        this.volume = null;
        this.bi = f;
        this.De = Qe();
        this.aj = this.Pa = null
    };
    Se.prototype.Bd = function(a, b) {
        return !!a && (!(void 0 === b ? 0 : b) || this.volume == a.volume) && this.bi == a.bi && bd(this.Pa, a.Pa) && Kc(this.Hd, a.Hd) && Kc(this.Oc, a.Oc) && this.aj == a.aj
    };
    var Te = function(a, b, c, d, e, f, g) {
        this.ui = a;
        this.Qi = b;
        this.zd = c;
        this.ve = d;
        this.oj = !0;
        this.Cd = e;
        this.ce = f;
        this.ke = g
    };
    Te.prototype.Ia = function() {
        return this.ui
    };
    Te.prototype.Mg = function() {
        return this.ve
    };
    Te.prototype.Bd = function(a, b) {
        return this.ui.Bd(a.ui, void 0 === b ? !1 : b) && this.Qi == a.Qi && bd(this.zd, a.zd) && bd(this.ve, a.ve) && this.Cd == a.Cd && this.ce == a.ce && this.ke == a.ke
    };
    var Ue = Ha(),
        Ve = -1,
        We = -1,
        Xe, Ye = -1,
        Ze = !1,
        L = function() {
            return Ha() - Ue
        },
        $e = function(a) {
            var b = 0 <= We ? L() - We : -1,
                c = Ze ? L() - Ve : -1,
                d = 0 <= Ye ? L() - Ye : -1;
            if (79463068 == a) return 500;
            if (947190542 == a) return 100;
            if (79463069 == a) return 200;
            a = [2E3, 4E3];
            var e = [250, 500, 1E3];
            var f = b; - 1 != c && c < b && (f = c);
            for (b = 0; b < a.length; ++b)
                if (f < a[b]) {
                    var g = e[b];
                    break
                }
            void 0 === g && (g = e[a.length]);
            return -1 != d && 1500 < d && 4E3 > d ? 500 : g
        };
    var M = function() {
        this.Wl = !1;
        this.Jh = void 0;
        this.jb = !ed(H.top);
        var a = Yd();
        a = 0 < a.length && null != a[a.length - 1] && null != a[a.length - 1].url ? ((a = a[a.length - 1].url.match(Vd)[3] || null) ? decodeURI(a) : a) || "" : "";
        this.domain = a;
        this.dc = this.kg = this.de = this.Ra = null;
        this.mm = 0;
        this.Va = !1;
        this.Dd = null;
        this.Hi = 0;
        this.Ki = !1;
        this.l = "na";
        this.u = new td;
        J(this.u, "nio_mode", qd).fa = !0;
        J(this.u, "omid", I);
        J(this.u, "mraid_race", I);
        J(this.u, "osd", I).fa = !0;
        J(this.u, "umt", I).fa = !0;
        J(this.u, "gmpd", I).fa = !0;
        J(this.u, "sel", I).fa = !0;
        J(this.u,
            "spna", I).fa = !0;
        J(this.u, "ujs", I).fa = !0;
        J(this.u, "cll", rd).fa = !0;
        J(this.u, "inapp", nd).fa = !0;
        this.Fl = -1
    };
    za(M);
    var af = function(a) {
        this.Qm = a;
        this.hk = 0;
        this.vh = null
    };
    af.prototype.cancel = function() {
        H.clearTimeout(this.vh);
        this.vh = null
    };
    var bf = function(a) {
        H && (a.vh = H.setTimeout(Ce(143, function() {
            a.hk++;
            a.Qm.gk()
        }), $e(M.g().Jh)))
    };
    var df = function() {
            return !cf() && (B("iPod") || B("iPhone") || B("Android") || B("IEMobile"))
        },
        cf = function() {
            return B("iPad") || B("Android") && !B("Mobile") || B("Silk")
        };
    var N = function(a, b, c) {
        this.ca = a;
        this.name = b;
        this.Rb = [];
        this.Zc = !1;
        this.ub = new Se(-1, new E(0, 0), new E(0, 0), new E(0, 0), new E(0, 0), !0);
        this.Ea = this;
        this.Ld = this.fc = c;
        this.$c = cf() || df();
        this.we = !1;
        this.wg = null;
        this.Uj = !1;
        this.Ya = new af(this);
        this.wf = this.Fi = !1;
        this.Yi = "uk";
        this.Da = !1
    };
    l = N.prototype;
    l.Cc = function() {
        return this.sb()
    };
    l.sb = function() {
        return !0
    };
    l.initialize = function() {
        return this.Zc = !0
    };
    l.Uc = function() {
        return this.Yi
    };
    l.Nb = function() {
        return this.wf
    };
    var ff = function(a, b) {
        a.wf || (a.wf = !0, a.Yi = b, a.Ld = 0, a.Gf(), a.Ea == a && (a.fc = 0, ef(a)))
    };
    N.prototype.Ve = function() {
        return this.ca
    };
    N.prototype.getName = function() {
        return this.Ea == this ? this.name : this.Ea.getName()
    };
    N.prototype.Ga = function() {
        return {}
    };
    N.prototype.Mb = function() {
        return this.fc
    };
    var gf = function(a, b) {
            0 <= Ua(a.Rb, b) || (a.Rb.push(b), b.Xc(a.Ea), b.lc(a.ub), b.Vb() && (a.we = !0))
        },
        jf = function(a, b) {
            eb(a.Rb, b);
            a.we && b.Vb() && hf(a)
        },
        kf = function(a) {
            var b = L(),
                c = kd(!0, a.ca, a.$c),
                d = a.ca.screen ? new E(a.ca.screen.width, a.ca.screen.height) : new E(0, 0),
                e = kd(!1, a.ca, a.$c);
            a.wg || (a.wg = Re(c, a.ca));
            var f = a.wg;
            a = a.P();
            return new Se(b, c, d, f, e, a)
        };
    N.prototype.gk = function() {
        if (this.Uj && this.Ea == this) {
            this.Ya && this.Ya.cancel();
            var a = kf(this);
            a.volume = this.ub.volume;
            a.Pa = this.ub.Pa;
            lf(this, a);
            this.Uj && this.Ya && bf(this.Ya)
        }
    };
    var hf = function(a) {
        a.we = a.Rb.length ? Ya(a.Rb, function(a) {
            return a.Vb()
        }) : !1
    };
    N.prototype.Gf = function() {};
    N.prototype.Ia = function() {
        return this.ub
    };
    var mf = function(a) {
            var b = gb(a.Rb);
            A(b, function(b) {
                b.lc(a.ub)
            })
        },
        ef = function(a) {
            var b = gb(a.Rb);
            A(b, function(b) {
                b.Xc(a.Ea)
            });
            a.Ea != a || mf(a)
        };
    N.prototype.Xc = function(a) {
        var b = this.fc,
            c = a.Mb();
        this.Ea = c < this.Ld ? this : a;
        this.fc = this.Ea != this ? c : this.Ld;
        this.Ea == this || 1 == c && 0 != this.Ld || this.Gf();
        this.fc != b && ef(this)
    };
    var lf = function(a, b) {
        var c = a.Fi || !a.ub.Bd(b, a.we);
        a.ub = b;
        c && mf(a)
    };
    N.prototype.lc = function(a) {
        this.Ea != this && lf(this, a)
    };
    N.prototype.Vb = function() {
        return this.we
    };
    N.prototype.Ba = function() {
        this.Da = !0
    };
    N.prototype.P = function() {
        var a = Je(),
            b = 1 === a;
        a = 0 === a;
        return M.g().Ki ? b : b || a
    };
    var nf = function(a, b, c, d) {
        this.element = a;
        this.Zb = this.B = b;
        this.u = c;
        this.Ek = d;
        this.Da = !1;
        this.eb = new Te(b.Ia(), this.element, new G(0, 0, 0, 0), null, 0, 0)
    };
    l = nf.prototype;
    l.observe = function() {
        return !0
    };
    l.unobserve = function() {};
    l.Fe = function() {
        this.eb = new Te(this.B.Ia(), this.element, this.eb.zd, this.eb.Mg(), this.eb.Cd, this.eb.ce)
    };
    l.Ba = function() {
        this.Da || (jf(this.B, this), this.Da = !0)
    };
    l.getName = function() {
        return this.Zb.getName()
    };
    l.Ga = function() {
        return this.Zb.Ga()
    };
    l.Mb = function() {
        return this.Zb.Mb()
    };
    l.Uc = function() {
        return this.Zb.Uc()
    };
    l.Nb = function() {
        return this.Zb.Nb()
    };
    l.Xc = function(a) {
        this.Zb = a;
        this.Ek.Xc(this)
    };
    l.lc = function() {
        this.Fe()
    };
    l.Vb = function() {
        return this.Ek.Vb()
    };
    var of = function(a) {
        this.Da = !1;
        this.B = a
    };
    l = of .prototype;
    l.getName = function() {
        return this.B.getName()
    };
    l.Ga = function() {
        return this.B.Ga()
    };
    l.Mb = function() {
        return this.B.Mb()
    };
    l.Uc = function() {
        return this.B.Uc()
    };
    l.Nb = function() {
        return this.B.Nb()
    };
    l.create = function(a, b, c) {
        var d = null;
        this.B && (d = this.xd(a, b, c), gf(this.B, d));
        return d
    };
    l.Cc = function() {
        return this.sb()
    };
    l.sb = function() {
        return !1
    };
    l.init = function() {
        return !0
    };
    l.Ba = function() {
        this.Da = !0
    };
    var pf = {},
        qf = null;
    pf.le = 0;
    pf.nt = 2;
    pf.Fr = 3;
    pf.Po = 5;
    pf.me = 1;
    pf.om = 4;
    var rf = function(a) {
        pf.e = -1;
        pf.i = 6;
        pf.n = 7;
        pf.t = 8;
        if (!qf) {
            var b = [];
            fd(pf, function(a, c) {
                b[a + 1] = c
            });
            var c = b.join(""),
                d = a && a[c];
            qf = d && function(b, c) {
                return d.call(a, b, c)
            }
        }
        return qf
    };
    var sf = function() {
        this.Ne = this.nh = this.Ke = this.gi = 0
    };
    l = sf.prototype;
    l.la = function() {
        return this.gi
    };
    l.Ua = function() {
        return this.nh
    };
    l.Tc = function() {
        return this.Ne
    };
    l.Bc = function() {
        this.Ne = 0
    };
    l.update = function(a, b, c) {
        a && (this.gi += b, this.Ne += b, this.Ke += b, this.nh = Math.max(this.nh, this.Ke));
        if (void 0 === c ? !a : c) this.Ke = 0
    };
    var tf = function() {
        this.Jf = [1, .75, .5, .3, 0];
        this.Ee = Wa(this.Jf, function() {
            return new sf
        })
    };
    tf.prototype.la = function(a) {
        return uf(this, function(a) {
            return a.la()
        }, void 0 === a ? !0 : a)
    };
    var wf = function(a, b) {
        return vf(a, b, function(a) {
            return a.la()
        })
    };
    tf.prototype.Ua = function() {
        return uf(this, function(a) {
            return a.Ua()
        }, !0)
    };
    var xf = function(a, b) {
        return vf(a, b, function(a) {
            return a.Ua()
        })
    };
    tf.prototype.Tc = function() {
        return uf(this, function(a) {
            return a.Tc()
        }, !0)
    };
    var yf = function(a, b) {
        return vf(a, b, function(a) {
            return a.Tc()
        })
    };
    tf.prototype.Bc = function() {
        A(this.Ee, function(a) {
            return a.Bc()
        })
    };
    tf.prototype.update = function(a, b, c, d, e, f) {
        f = void 0 === f ? !0 : f;
        b = e ? Math.min(a, b) : b;
        for (e = 0; e < this.Jf.length; e++) {
            var g = this.Jf[e],
                h = 0 < b && b >= g;
            g = !(0 < a && a >= g) || c;
            this.Ee[e].update(f && h, d, !f || g)
        }
    };
    var uf = function(a, b, c) {
            a = Wa(a.Ee, function(a) {
                return b(a)
            });
            return c ? a : zf(a)
        },
        vf = function(a, b, c) {
            var d = cb(a.Jf, function(a) {
                return b <= a
            });
            return -1 == d ? 0 : c(a.Ee[d])
        },
        zf = function(a) {
            return Wa(a, function(a, c, d) {
                return 0 < c ? d[c] - d[c - 1] : d[c]
            })
        };
    var Af = function() {
        this.$a = new tf;
        this.ri = new sf;
        this.oh = this.Vd = -1;
        this.bk = 1E3
    };
    Af.prototype.update = function(a, b, c, d, e) {
        this.Vd = -1 != this.Vd ? Math.min(this.Vd, b.A) : b.A;
        e && (this.oh = Math.max(this.oh, b.A));
        this.$a.update(b.A, c.A, b.If, a, d);
        this.ri.update(d || c.Pb != b.Pb ? pd(c) && pd(b) : pd(c), a, !pd(b) || b.If)
    };
    Af.prototype.qc = function() {
        return this.ri.Ua() >= this.bk
    };
    var Bf = function(a, b, c, d) {
        nf.call(this, a, b, c, d);
        this.Fa = new G(0, 0, 0, 0)
    };
    q(Bf, nf);
    var Df = function(a, b, c, d) {
            return 0 >= a.getWidth() || 0 >= a.getHeight() ? !0 : c && d ? Be(208, function() {
                return Cf(a, b, c)
            }) : !1
        },
        Ef = function(a, b) {
            return a.left <= b.right && b.left <= a.right && a.top <= b.bottom && b.top <= a.bottom ? new G(Math.max(a.top, b.top), Math.min(a.right, b.right), Math.min(a.bottom, b.bottom), Math.max(a.left, b.left)) : new G(0, 0, 0, 0)
        },
        Gf = function(a, b) {
            a = Ff(a);
            b = Ff(b);
            return 0 === b ? 0 : a / b
        },
        Ff = function(a) {
            return Math.max(a.getHeight() * a.getWidth(), 0)
        },
        Cf = function(a, b, c) {
            if (!a || !b) return !1;
            b = a.clone().translate(-b.left,
                -b.top);
            a = (b.left + b.right) / 2;
            b = (b.top + b.bottom) / 2;
            var d = Td();
            ed(d.top) && d.top && d.top.document && (d = d.top);
            d = rf(d && d.document);
            if (!d) return !1;
            a = d(a, b);
            if (!a) return !1;
            b = (b = (b = Mc(c)) && b.defaultView && b.defaultView.frameElement) && Hf(b, a);
            d = a === c;
            a = !d && a && ad(a, function(a) {
                return a === c
            });
            return !(b || d || a)
        },
        Hf = function(a, b) {
            if (!a || !b) return !1;
            for (var c = 0; null !== a && 100 > c++;) {
                if (a === b) return !0;
                try {
                    if (a = Wc(a) || a) {
                        var d = Mc(a),
                            e = d && (d ? Qc(d) : window),
                            f = e && e.frameElement;
                        f && (a = f)
                    }
                } catch (g) {
                    break
                }
            }
            return !1
        };
    Bf.prototype.Mg = function() {
        var a = this.B.Ia().Pa;
        if (!a) return new G(0, 0, 0, 0);
        a = Ef(this.Fa, a);
        return a.top >= a.bottom || a.left >= a.right ? new G(0, 0, 0, 0) : a.translate(-this.Fa.left, -this.Fa.top)
    };
    Bf.prototype.Fe = function() {
        if (this.element) {
            var a = this.element.getBoundingClientRect(),
                b = a.right - a.left;
            a = a.bottom - a.top;
            var c = Id(this.element, this.B.Ve()),
                d = c.x;
            c = c.y;
            this.Fa = new G(Math.round(c), Math.round(d + b), Math.round(c + a), Math.round(d))
        }
        b = this.Mg();
        a = this.B.Ia().Pa;
        c = d = 0;
        var e = 1 == K(this.u, "od"),
            f = (this.Fa.bottom - this.Fa.top) * (this.Fa.right - this.Fa.left);
        a && b && 0 < f && (Df(b, a, this.element, e) ? b = new G(0, 0, 0, 0) : (d = Gf(b, this.Fa), c = Gf(b, a)));
        this.eb = new Te(this.B.Ia(), this.element, this.Fa, b, d, c)
    };
    Bf.prototype.Nb = function() {
        return this.Zb.Nb()
    };
    Bf.prototype.lc = function(a) {
        if (null == this.element)
            if (null != a.Hd) {
                var b = a.Hd;
                this.Fa = new G(0, b.width, b.height, 0)
            } else this.Fa = new G(0, 0, 0, 0);
        nf.prototype.lc.call(this, a)
    };
    var If = function(a, b, c) {
        c = void 0 === c ? 0 : c;
        z(0 < a.length);
        z("function" !== typeof b);
        z(-16 <= c);
        z(17 > c);
        this.gd = c;
        this.rc = a;
        this.ba = null == b ? "" : b
    };
    If.prototype.getParameter = function() {
        return this.rc
    };
    var Jf = function(a) {
            switch (Math.trunc(a.gd)) {
                case -16:
                    return -16;
                case -8:
                    return -8;
                case 0:
                    return 0;
                case 8:
                    return 8;
                case 16:
                    return 16;
                default:
                    return z(!1), 16
            }
        },
        Kf = function(a, b) {
            z(0 < b && 1 > b);
            return new If(a.rc, a.ba, a.gd + b)
        },
        Lf = function(a, b) {
            return a.gd < b.gd ? !0 : a.gd > b.gd ? !1 : a.rc < b.rc ? !0 : a.rc > b.rc ? !1 : typeof a.ba < typeof b.ba ? !0 : typeof a.ba > typeof b.ba ? !1 : a.ba < b.ba
        };
    var Mf = function() {
        this.Yg = 0;
        this.Tb = [];
        this.Yh = !1
    };
    Mf.prototype.add = function(a, b, c) {
        ++this.Yg;
        z(4096 > this.Yg);
        var d = this.Yg / 4096;
        this.Tb.push(Kf(new If(a, b, c), d));
        this.Yh = !0;
        return this
    };
    Mf.prototype.addAll = function(a) {
        var b = this;
        A(a.Tb, function(a) {
            b.add(a.getParameter(), a.ba, Jf(a))
        });
        return this
    };
    var Nf = function(a, b) {
            var c = void 0 === c ? 0 : c;
            var d = void 0 === d ? !0 : d;
            fd(b, function(b, f) {
                d && void 0 === b || a.add(f, b, c)
            });
            return a
        },
        Of = function(a) {
            a.Yh && (ib(a.Tb, function(a, c) {
                return Lf(c, a) ? 1 : Lf(a, c) ? -1 : 0
            }), a.Yh = !1);
            return Xa(a.Tb, function(a, c) {
                var b = "boolean" === typeof c.ba;
                c = "" + (b && !c.ba ? "" : c.rc) + (b || "" === c.ba ? "" : "=" + c.ba);
                return "" + a + ("" != a && "" != c ? "&" : "") + c
            }, "")
        };
    var Pf, Qf = new Date(0);
    Pf = yb(Qf.getUTCFullYear(), 4) + yb(Qf.getUTCMonth() + 1, 2) + yb(Qf.getUTCDate(), 2) + "T" + yb(Qf.getUTCHours(), 2) + yb(Qf.getUTCMinutes(), 2) + "Z";
    var Rf = function(a) {
        z(!0);
        this.Jm = "//pagead2.googlesyndication.com//pagead/gen_204";
        this.Tb = new Mf;
        void 0 !== a && this.Tb.addAll(a);
        this.Tb.add("avv", Pf, -16)
    };
    Rf.prototype.toString = function() {
        var a = this.Jm,
            b = Of(this.Tb);
        0 < b.length && (a += "?" + b);
        return a
    };
    var Sf = function(a) {
            fd(a, function(b, c) {
                b instanceof Array && (a[c] = b.join(","))
            });
            return a
        },
        Tf = function(a) {
            var b = [],
                c = [];
            Ib(a, function(a, e) {
                if (!(e in Object.prototype) && "undefined" != typeof a) switch (Ba(a) && (a = a.join(",")), a = [e, "=", a].join(""), e) {
                    case "adk":
                    case "r":
                    case "tt":
                    case "error":
                    case "mtos":
                    case "tos":
                    case "p":
                    case "bs":
                    case "aio":
                    case "nio":
                    case "iem":
                        b.unshift(a);
                        break;
                    case "req":
                    case "url":
                    case "referrer":
                    case "iframe_loc":
                        c.push(a);
                        break;
                    default:
                        b.push(a)
                }
            });
            return b.concat(c)
        },
        Vf = function(a) {
            a =
                new Rf(a);
            Uf(a)
        },
        Uf = function(a) {
            a = a.toString();
            a = a.substring(0, 2E3);
            var b = Td() || H;
            Qd(b, a)
        };
    var Wf = new G(0, 0, 0, 0),
        Xf = {
            threshold: [0, .3, .5, .75, 1]
        },
        O = function(a, b, c) {
            this.position = Wf.clone();
            this.Hb = 0;
            this.ua = this.Te();
            this.lh = -2;
            this.Um = Ha();
            this.wk = -1;
            this.Pd = b;
            this.gh = null;
            this.gc = -1 != b;
            this.Ic = this.nf = null;
            this.opacity = -1;
            this.Rh = c;
            this.yk = this.ph = ya;
            this.hc = this.element = a;
            this.ki = this.bd = !1;
            this.xg = 1;
            this.pk = !0;
            this.Rf = null;
            this.ib = this.cf = this.jk = !1;
            M.g().mm++;
            this.domain = null;
            this.wj = 0;
            this.Y = this.Jg();
            this.vk = -1;
            this.Zf = new G(0, 0, 0, 0);
            this.af = !1;
            a = this.u = new td;
            J(a, "od", md);
            J(a, "opac",
                I).fa = !0;
            J(a, "ud", I);
            J(a, "mkm", I).fa = !0;
            J(a, "xza", I).fa = !0;
            J(a, "lom", I);
            J(a, "mraid_race", I).fa = !0;
            J(a, "iehp", I).fa = !0;
            J(a, "sela", I).fa = !0;
            if (a = this.element && this.element.getAttribute) a = this.element, a = /-[a-z]/.test("googleAvInapp") ? !1 : Ie && a.dataset ? "googleAvInapp" in a.dataset : a.hasAttribute ? a.hasAttribute("data-" + Db()) : !!a.getAttribute("data-" + Db());
            a && ud(M.g().u, "inapp", 1);
            1 == this.Rh ? ud(this.u, "od", 1) : ud(this.u, "od", 0)
        };
    O.prototype.lc = function() {};
    O.prototype.Xc = function(a) {
        a.Nb() && this.yk(this, a.Uc(), a)
    };
    O.prototype.Vb = function() {
        return !1
    };
    O.prototype.Te = function() {
        return new Af
    };
    var $f = function(a, b, c) {
            if (a.gc) {
                var d = rf(H && H.document);
                if (d) {
                    c || Yf(a, H, !0);
                    if (1 == K(a.u, "iehp") || a.Pb() || a.ki) {
                        var e = Zf(a, d);
                        d = !0
                    } else e = Rc(document), e = d(Math.floor((a.position.left + a.position.right) / 2) - e.x, Math.floor((a.position.top + a.position.bottom) / 2) - e.y) ? .5 : 0, d = !1;
                    a.Yb(a.position, e, b, c, !0, d)
                }
            }
        },
        ag = function(a, b, c) {
            if (c(b)) return b;
            for (;;) {
                var d = Math.floor((a + b) / 2);
                if (d == a || d == b) return a;
                c(d) ? a = d : b = d
            }
        },
        Zf = function(a, b) {
            var c = Rc(document),
                d = a.xg,
                e = Math.floor(a.position.left - c.x) + 1,
                f = Math.floor(a.position.top -
                    c.y) + 1,
                g = Math.floor(a.position.right - c.x) - d,
                h = Math.floor(a.position.bottom - c.y) - d;
            a = (h - f) * (g - e);
            if (f > h || e > g) return 0;
            c = !!b(e, f);
            d = !!b(g, h);
            if (c && d) return 1;
            var k = !!b(g, f),
                m = !!b(e, h);
            if (c) h = ag(f, h, function(a) {
                return !!b(e, a)
            }), g = ag(e, g, function(a) {
                return !!b(a, f)
            });
            else if (k) h = ag(f, h, function(a) {
                return !!b(g, a)
            }), e = ag(g, e, function(a) {
                return !!b(a, f)
            });
            else if (m) f = ag(h, f, function(a) {
                return !!b(e, a)
            }), g = ag(e, g, function(a) {
                return !!b(a, h)
            });
            else if (d) f = ag(h, f, function(a) {
                return !!b(g, a)
            }), e = ag(g, e, function(a) {
                return !!b(a,
                    h)
            });
            else {
                var n = Math.floor((e + g) / 2),
                    t = Math.floor((f + h) / 2);
                if (!b(n, t)) return 0;
                f = ag(t, f, function(a) {
                    return !!b(n, a)
                });
                h = ag(t, h, function(a) {
                    return !!b(n, a)
                });
                e = ag(n, e, function(a) {
                    return !!b(a, t)
                });
                g = ag(n, g, function(a) {
                    return !!b(a, t)
                })
            }
            return (h - f) * (g - e) / a
        },
        bg = function(a, b, c, d, e) {
            a.gc && (d || Yf(a, H, e), a.Yb(a.position, c, b, d, !1, !0))
        };
    O.prototype.Fj = function() {};
    O.prototype.Ej = function() {};
    O.prototype.hj = function() {};
    O.prototype.Nf = function() {};
    var cg = function(a, b, c) {
            if (a.gc) {
                var d = c ? a.Y.A : a.wj;
                a.Zf && !bd(a.Zf, new G(0, 0, 0, 0)) && (d = a.Zf.clone().translate(a.position.left, a.position.top));
                a.Yb(a.position, d, b, c, !0, !0)
            }
        },
        dg = function(a, b) {
            b = b.create(a.hc, a.u, a);
            null != b && b.observe();
            b && (a.l = b)
        },
        eg = function(a, b, c) {
            if (a.gc && a.l) {
                var d = Td(),
                    e = M.g();
                Yf(a, d, e.jb);
                a.l.Fe();
                e = a.l.eb;
                var f = e.Ia().Pa;
                d = !(!e.oj && !f);
                if (null != e.ve && f) {
                    var g = e.zd;
                    a.nf = new D(g.left - f.left, g.top - f.top);
                    a.Ic = new E(f.right - f.left, f.bottom - f.top)
                }
                f = a.af || a.cf ? e.ce : e.Cd;
                void 0 !==
                    e.ke ? (e = void 0 === e.ke ? -1 : e.ke, g = 0, null !== a.gh && (g = Math.max(0, e - a.gh)), a.gh = e, a.Yb(a.position, f, b, c, !0, d, void 0, g)) : a.Yb(a.position, f, b, c, !0, d)
            }
        },
        fg = function(a) {
            if (a.gc && a.Rf && !a.jk) {
                a.Rf.Fe();
                var b = a.Rf.eb,
                    c = b.Ia().Pa,
                    d = !(!b.oj && !c),
                    e = null,
                    f = null,
                    g = !1;
                null != b.ve && c && (e = b.zd, e = new D(e.left - c.left, e.top - c.top), f = new E(c.right - c.left, c.bottom - c.top), g = !Jc(e, a.nf) || !Kc(f, a.Ic));
                b = a.af || a.cf ? b.ce : b.Cd;
                b != a.Y.A && (g = !0);
                g && (c = new Mf, c.add("id", "avtest").add("r", "strat_verify").add("b_strat", a.l ? a.l.getName() :
                    M.g().l).add("v_strat", a.Rf.getName()).add("b_vp_off", JSON.stringify(a.nf)).add("v_vp_off", JSON.stringify(e)).add("b_vp_sz", JSON.stringify(a.Ic)).add("v_vp_sz", JSON.stringify(f)).add("b_exp", a.Y.A).add("v_exp", b).add("efp_occ", 1 == K(a.u, "od")).add("exp_meas", d).add("sbv", a.af || a.cf), Vf(c), a.jk = !0)
            }
        };
    l = O.prototype;
    l.Yb = function(a, b, c, d, e, f, g, h) {
        g = void 0 === g ? {} : g;
        h = void 0 === h ? this.fj(c, g) : h;
        g = this.mg(a, b, d, g);
        w(b) || (this.nf = new D(a.left - b.left, a.top - b.top), this.Ic = new E(b.right - b.left, b.bottom - b.top));
        e = e && this.Y.A >= (this.Pb() ? .3 : .5);
        this.ji(h, g, e, f);
        this.Pd = c;
        0 < g.A && (z(-1 !== c, "The ad cannot have been exposed at INVALID_TIME."), -1 === this.vk && (this.vk = c)); - 1 == this.wk && this.qc() && (this.wk = c);
        if (-2 == this.lh) try {
            a: {
                var k = w(b) ? null : b;
                if (a && a != Wf && 0 != this.Hb) {
                    if (!k) {
                        if (!this.Ic) {
                            var m = -1;
                            break a
                        }
                        k = new G(0, this.Ic.width,
                            this.Ic.height, 0)
                    }
                    m = k.getWidth && 0 < k.getWidth() && k.getHeight && 0 < k.getHeight() ? this.vd(a, k) : -1
                } else m = -1
            }
            this.lh = m
        }
        catch (n) {
            De(207, n)
        }
        this.Y = g;
        d && (this.Y.A = 0);
        this.ph(this)
    };
    l.ji = function(a, b, c, d) {
        this.ua.update(a, b, this.Y, c, d)
    };
    l.Jg = function() {
        return new od
    };
    l.mg = function(a, b, c) {
        var d = this.Jg();
        d.If = c;
        d.De = Qe();
        d.A = w(b) ? this.vd(b) : this.vd(a, b);
        d.Pb = this.Pb();
        return d
    };
    l.fj = function(a) {
        if (-1 == this.Pd) return 0;
        a = a - this.Pd || 1;
        return 1E4 < a ? 1 : a
    };
    l.vd = function(a, b) {
        if (0 === this.opacity && 1 === K(this.u, "opac")) return 0;
        if (w(a)) return a;
        z(null != b);
        a = Ef(a, b);
        var c = 1 == K(this.u, "od");
        if (0 >= this.Hb || Df(a, b, this.hc, c)) return 0;
        c = Ff(a) / this.Hb;
        b = Gf(a, b);
        return this.af || this.cf ? Math.max(c, b) : c
    };
    l.Pb = function() {
        return !1
    };
    var Yf = function(a, b, c, d) {
        if (d) a.position = d;
        else {
            b = c ? b : b.top;
            try {
                var e = Wf.clone(),
                    f = new D(0, 0);
                if (a.hc) {
                    var g = 1 == a.Rh;
                    !c && g && Ne(a.hc) || (e = a.hc.getBoundingClientRect());
                    f = Id(a.hc, b)
                }
                c = f;
                var h = c.x,
                    k = c.y;
                a.position = new G(Math.round(k), Math.round(h + (e.right - e.left)), Math.round(k + (e.bottom - e.top)), Math.round(h))
            } catch (m) {
                a.position = Wf.clone()
            }
        }
        a.Hb = (a.position.bottom - a.position.top) * (a.position.right - a.position.left)
    };
    O.prototype.Ha = function() {
        return 0
    };
    O.prototype.qc = function() {
        return this.ua.qc()
    };
    var gg = function(a, b) {
            b = Math.pow(10, b);
            return Math.floor(a * b) / b
        },
        hg = function(a) {
            a.l && a.l.unobserve()
        },
        kg = function(a, b) {
            var c = !1,
                d = a.hc;
            b.document && b.document.body && 12 == a.Rh && (d = b.document.body);
            if (null === d) return !1;
            Be(152, function() {
                var e = new b.IntersectionObserver(function(c) {
                    try {
                        ig(b, c, a)
                    } catch (g) {
                        try {
                            e.unobserve(d), De("osd_adblock::nioc", g)
                        } catch (h) {}
                    }
                }, Xf);
                e.observe(d);
                jg(d);
                c = !0
            });
            return c
        },
        jg = function(a) {
            if (a && (a = a.style)) {
                var b = a.opacity;
                a.opacity = .98;
                a.opacity = .99;
                a.opacity = b
            }
        },
        lg = function(a,
            b) {
            var c = !1;
            Be(151, function() {
                var d = Pd(b).observeIntersection(function(c) {
                    try {
                        ig(b, c, a)
                    } catch (f) {
                        try {
                            d(), De("osd_adblock::aioc", f)
                        } catch (g) {}
                    }
                });
                c = !0
            });
            return c
        },
        ig = function(a, b, c) {
            if (!b || !b.length || 0 >= b.length) b = null;
            else {
                for (var d = b[0], e = 1; e < b.length; e++) b[e].time > d.time && (d = b[e]);
                b = d
            }
            if (d = b) b = Oe(d.boundingClientRect), e = Oe(d.intersectionRect), c.Y.A = Math.min(Math.max(d.intersectionRect.width * d.intersectionRect.height / (d.boundingClientRect.width * d.boundingClientRect.height), 0), 1), c.wj = c.Y.A, Yf(c,
                a, !0, b), a = Ef(b, e), c.Zf = 0 >= c.Hb || a.top >= a.bottom || a.left >= a.right ? new G(0, 0, 0, 0) : a.translate(-b.left, -b.top)
        },
        mg = function(a, b, c, d) {
            if (d = void 0 === d ? ya : d) a.yk = d;
            switch (c) {
                case "nio":
                    return kg(a, b);
                case "aio":
                    return lg(a, b);
                case "geo":
                case "iem":
                    return !0
            }
            return !1
        };
    var ng = "StopIteration" in r ? r.StopIteration : {
            message: "StopIteration",
            stack: ""
        },
        og = function() {};
    og.prototype.next = function() {
        throw ng;
    };
    og.prototype.Xk = function() {
        return this
    };
    var pg = function(a) {
        for (var b = 0, c = a, d = 0; a && a != a.parent;) a = a.parent, d++, ed(a) && (c = a, b = d);
        return {
            ca: c,
            level: b
        }
    };
    var qg = function() {
            this.S = {}
        },
        tg = function() {
            if (rg) var a = rg;
            else {
                a = ((a = Pd()) ? ed(a.master) ? a.master : null : null) || Td();
                var b = a.google_persistent_state_async;
                a = null != b && "object" == typeof b && null != b.S && "object" == typeof b.S ? rg = b : a.google_persistent_state_async = rg = new qg
            }
            b = Td();
            var c = Pd(b);
            c ? ((c = c || Pd()) ? (b = c.pageViewId, c = c.clientId, v(c) && (b += c.replace(/\D/g, "").substr(0, 6))) : b = null, b = +b) : (b = pg(b).ca, (c = b.google_global_correlator) || (b.google_global_correlator = c = 1 + Math.floor(Math.random() * Math.pow(2, 43))), b =
                c);
            c = sg[7] || "google_ps_7";
            a = a.S;
            var d = a[c];
            a = void 0 === d ? a[c] = b : d;
            return a
        },
        rg = null,
        zg = {},
        sg = (zg[8] = "google_prev_ad_formats_by_region", zg[9] = "google_prev_ad_slotnames_by_region", zg);
    var Ag = {
            currentTime: 1,
            duration: 2,
            isVpaid: 4,
            volume: 8,
            isYouTube: 16,
            isPlaying: 32
        },
        Mb = {
            Tk: "start",
            FIRST_QUARTILE: "firstquartile",
            MIDPOINT: "midpoint",
            THIRD_QUARTILE: "thirdquartile",
            COMPLETE: "complete",
            Nk: "metric",
            Pk: "pause",
            Qk: "resume",
            SKIPPED: "skip",
            VIEWABLE_IMPRESSION: "viewable_impression",
            Ok: "mute",
            Wk: "unmute",
            FULLSCREEN: "fullscreen",
            Kk: "exitfullscreen",
            pn: "bufferstart",
            on: "bufferfinish",
            Lk: "fully_viewable_audible_half_duration_impression",
            Mk: "measurable_impression",
            Fk: "abandon",
            Jk: "engagedview",
            IMPRESSION: "impression",
            Hk: "creativeview",
            LOADED: "loaded",
            Mn: "progress",
            qn: "close",
            rn: "collapse",
            Hn: "overlay_resize",
            In: "overlay_unmeasurable_impression",
            Jn: "overlay_unviewable_impression",
            Ln: "overlay_viewable_immediate_impression",
            Kn: "overlay_viewable_end_of_session_impression",
            Ik: "custom_metric_viewable"
        },
        Bg = "start firstquartile midpoint thirdquartile resume loaded".split(" "),
        Cg = ["start", "firstquartile", "midpoint", "thirdquartile"],
        Dg = ["abandon"],
        Eg = {
            Rn: -1,
            Tk: 0,
            FIRST_QUARTILE: 1,
            MIDPOINT: 2,
            THIRD_QUARTILE: 3,
            COMPLETE: 4,
            Nk: 5,
            Pk: 6,
            Qk: 7,
            SKIPPED: 8,
            VIEWABLE_IMPRESSION: 9,
            Ok: 10,
            Wk: 11,
            FULLSCREEN: 12,
            Kk: 13,
            Lk: 14,
            Mk: 15,
            Fk: 16,
            Jk: 17,
            IMPRESSION: 18,
            Hk: 19,
            LOADED: 20,
            Ik: 21
        };
    var Fg = function() {
        od.call(this);
        this.bj = !1;
        this.volume = void 0;
        this.paused = !1;
        this.Ij = -1
    };
    q(Fg, od);
    var Gg = function(a) {
        return Pe(a.volume) && .1 <= a.volume
    };
    var Hg = function() {
        var a = {};
        this.Rc = (a.vs = [1, 0], a.vw = [0, 1], a.am = [2, 2], a.a = [4, 4], a.f = [8, 8], a.bm = [16, 16], a.b = [32, 32], a.avw = [0, 64], a.cm = [128, 128], a.pv = [256, 256], a.gdr = [0, 512], a.p = [0, 1024], a.r = [0, 2048], a.m = [0, 4096], a.um = [0, 8192], a.ef = [0, 16384], a.s = [0, 32768], a.pmx = [0, 16777216], a);
        this.Ob = {};
        for (var b in this.Rc) 0 < this.Rc[b][1] && (this.Ob[b] = 0);
        this.Md = 0
    };
    Hg.prototype.na = function(a) {
        var b = this.Rc[a],
            c = b[1];
        this.Md += b[0];
        0 < c && 0 == this.Ob[a] && (this.Ob[a] = 1)
    };
    var Jg = function(a) {
            return Ig(a, Lb(a.Rc))
        },
        Ig = function(a, b) {
            var c = 0,
                d;
            for (d in a.Ob) 0 <= Ua(b, d) && 1 == a.Ob[d] && (c += a.Rc[d][1], a.Ob[d] = 2);
            return c
        },
        Kg = function(a) {
            var b = 0,
                c;
            for (c in a.Ob) {
                var d = a.Ob[c];
                if (1 == d || 2 == d) b += a.Rc[c][1]
            }
            return b
        };
    var Lg = function() {
        this.Td = this.Ud = 0;
        this.Rm = 32
    };
    Lg.prototype.Kd = function() {
        return this.Ud
    };
    Lg.prototype.update = function(a, b) {
        a >= this.Rm || (this.Td & 1 << a && !b ? this.Ud &= ~(1 << a) : this.Td & 1 << a || !b || (this.Ud |= 1 << a), this.Td |= 1 << a)
    };
    var Mg = function() {
        Af.call(this);
        this.Eb = new sf;
        this.oi = this.Ce = this.Yf = 0;
        this.ie = -1;
        this.Ak = new sf;
        this.Nc = new sf;
        this.qb = new tf;
        this.Rd = this.uc = -1;
        this.Se = new sf;
        this.bk = 2E3;
        this.Gh = new Lg;
        this.Rj = new Lg;
        this.Qj = new Lg
    };
    q(Mg, Af);
    var Ng = function(a, b, c) {
        var d = a.oi;
        Ze || c || -1 == a.ie || (d += b - a.ie);
        return d
    };
    Mg.prototype.update = function(a, b, c, d, e) {
        if (!b.paused) {
            Af.prototype.update.call(this, a, b, c, d, e);
            e = Gg(b) && Gg(c);
            var f = .5 <= (d ? Math.min(b.A, c.A) : c.A);
            Pe(b.volume) && (this.uc = -1 != this.uc ? Math.min(this.uc, b.volume) : b.volume, this.Rd = Math.max(this.Rd, b.volume));
            f && (this.Yf += a, this.Ce += e ? a : 0);
            this.qb.update(b.A, c.A, b.If, a, d, e);
            this.Eb.update(!0, a);
            this.Nc.update(e, a);
            this.Se.update(c.bj, a);
            this.Ak.update(e && !f, a);
            a = Math.floor(b.Ij / 1E3);
            this.Gh.update(a, pd(b));
            this.Rj.update(a, 1 <= b.A);
            this.Qj.update(a, Gg(b))
        }
    };
    var Og = function() {
        this.kd = !1
    };
    var Pg = function(a, b) {
        this.kd = !1;
        this.Jb = a;
        this.kn = b;
        this.Qe = 0
    };
    q(Pg, Og);
    var Qg = function(a, b) {
        return a.lf(b) ? (b = a.kn.Oa(a.Jb, b), a.Qe |= b, 0 == b) : !1
    };
    Pg.prototype.lf = function() {
        return !0
    };
    Pg.prototype.bf = function() {
        return !1
    };
    Pg.prototype.Vc = function() {
        var a = this,
            b = Nb(function(b) {
                return b == a.Jb
            });
        return Eg[b].toString()
    };
    Pg.prototype.toString = function() {
        var a = "";
        this.bf() && (a += "c");
        this.kd && (a += "s");
        0 < this.Qe && (a += ":" + this.Qe);
        return this.Vc() + a
    };
    var Rg = new G(0, 0, 0, 0),
        Sg = {},
        Tg = (Sg.firstquartile = 0, Sg.midpoint = 1, Sg.thirdquartile = 2, Sg.complete = 3, Sg),
        Ug = function(a, b, c, d, e, f) {
            e = void 0 === e ? null : e;
            f = void 0 === f ? [] : f;
            O.call(this, b, c, d);
            this.vg = 0;
            this.mb = {};
            this.X = new Hg;
            this.si = {};
            this.va = "";
            this.Sb = null;
            this.ik = "";
            this.zk = !1;
            this.Wa = [];
            this.Sd = e;
            this.qd = f;
            this.ob = void 0;
            this.fb = -1;
            this.fh = this.gf = void 0;
            this.Dg = !1;
            this.kf = this.hf = 0;
            this.Uf = -1;
            this.ah = this.pi = !1;
            this.pd = this.xk = 0;
            this.sh = !1;
            this.vj = this.yj = -1;
            this.Tf = this.qe = this.F = 0;
            this.ln = this.El = -1;
            this.pm = 0;
            this.Cl = new tf;
            this.lg = this.uh = this.Dl = 0;
            this.Ih = -1;
            this.zh = 0;
            this.sj = !1;
            this.$g = null;
            this.V = 0;
            this.yb = ya;
            this.hd = [this.Te()];
            this.ki = !0;
            this.xg = 2;
            b = M.g();
            Yf(this, a, b.jb);
            this.Hc = {};
            this.Hc.pause = "p";
            this.Hc.resume = "r";
            this.Hc.skip = "s";
            this.Hc.mute = "m";
            this.Hc.unmute = "um";
            this.Hc.exitfullscreen = "ef";
            this.sf = null
        };
    q(Ug, O);
    Ug.prototype.Vb = function() {
        return !0
    };
    var Vg = function(a, b, c) {
        a.V = 1;
        a.mb = {};
        a.mb.firstquartile = !1;
        a.mb.midpoint = !1;
        a.mb.thirdquartile = !1;
        a.mb.complete = !1;
        a.mb.pause = !1;
        a.mb.skip = !1;
        a.mb.viewable_impression = !1;
        a.vg = 0;
        c || (a.ua.ie = b)
    };
    Ug.prototype.Fj = function(a) {
        var b = this,
            c = a - this.yj;
        this.sh && 1E3 >= c || (c = xa("ima.bridge.getNativeViewability"), x(c) && (c(this.va, function(a) {
            b.sh = !1;
            Ob(a) && b.zh++;
            b.Nf(a)
        }), this.sh = !0, this.yj = a))
    };
    Ug.prototype.Ej = function(a) {
        var b = M.g();
        a - this.vj > $e(b.Jh) && (a = xa("ima.admob.getViewability"), x(a) && a(this.va))
    };
    var Wg = function(a) {
        return u(a) ? Number(a) ? gg(a, 3) : 0 : a
    };
    l = Ug.prototype;
    l.hj = function(a) {
        this.vj = L();
        this.Nf(a)
    };
    l.Nf = function(a) {
        var b = a.opt_nativeViewBounds || {},
            c = a.opt_nativeViewVisibleBounds || {},
            d = a.opt_nativeTime || -1,
            e = a.opt_nativeVolume,
            f = a.opt_nativeViewAttached;
        a = a.opt_nativeViewHidden;
        void 0 !== f && (this.$g = !!f);
        b = new G(b.top || 0, b.left + b.width || 0, b.top + b.height || 0, b.left || 0);
        c = a ? Rg.clone() : new G(c.top || 0, c.left + c.width || 0, c.top + c.height || 0, c.left || 0);
        f = void 0;
        if ("n" == this.ob || "ml" == this.ob) f = {
            volume: e
        };
        e = f;
        e = void 0 === e ? {} : e;
        this.Hb = (b.bottom - b.top) * (b.right - b.left);
        this.position = b;
        this.Yb(b, c, d, !1, !0,
            !0, e)
    };
    l.Yb = function(a, b, c, d, e, f, g) {
        var h = this;
        g = void 0 === g ? {} : g;
        var k = this.yb(this) || {};
        Qb(k, g);
        this.fb = k.duration || this.fb;
        this.gf = k.isVpaid || this.gf;
        this.fh = k.isYouTube || this.fh;
        this.Dg = f;
        O.prototype.Yb.call(this, a, b, c, d, e, f, k);
        A(this.qd, function(a) {
            a.kd || (a.kd = Qg(a, h))
        })
    };
    l.ji = function(a, b, c, d) {
        O.prototype.ji.call(this, a, b, c, d);
        this.hd[this.hd.length - 1].update(a, b, this.Y, c, d);
        this.ah = Gg(this.Y) && Gg(b); - 1 == this.Uf && this.pi && (this.Uf = this.ua.Eb.la());
        this.X.Md = 0;
        a = this.Y;
        b = this.qc();
        .5 <= a.A && this.X.na("vs");
        b && this.X.na("vw");
        Pe(a.volume) && this.X.na("am");
        this.ah && this.X.na("a");
        this.ib && this.X.na("f"); - 1 != a.De && (this.X.na("bm"), 1 == a.De && this.X.na("b"));
        this.ah && b && this.X.na("avw");
        this.Dg && this.X.na("cm");
        this.Dg && 0 < a.A && this.X.na("pv");
        a = this.ua.Eb.la();
        Xg(this, a,
            !0) && this.X.na("gdr");
        2E3 <= xf(this.ua.$a, 1) && this.X.na("pmx")
    };
    l.Te = function() {
        return new Mg
    };
    l.Jg = function() {
        return new Fg
    };
    l.mg = function(a, b, c, d) {
        a = O.prototype.mg.call(this, a, b, c, d);
        a.bj = this.ib;
        a.paused = 2 == this.V;
        a.volume = d.volume;
        Pe(a.volume) || (this.xk++, b = this.Y, Pe(b.volume) && (a.volume = b.volume));
        d = d.currentTime;
        a.Ij = u(d) && 0 <= d ? d : -1;
        return a
    };
    var Yg = function(a) {
        var b = !!K(M.g().u, "umt");
        return (!a.gf || 0 < a.fb) && (b || a.fh) ? 1 : 0
    };
    Ug.prototype.fj = function(a, b) {
        b = u(b.currentTime) ? b.currentTime : this.hf;
        if (-1 == this.Pd || 2 == this.V) a = 0;
        else {
            a = a - this.Pd || 1;
            var c = 1E4;
            u(this.fb) && -1 != this.fb && (c = Math.max(c, this.fb / 3));
            a = a > c ? 1 : a
        }
        c = b - this.hf;
        var d = 0;
        0 <= c ? (this.kf += a, this.lg += Math.max(a - c, 0), d = Math.min(c, this.kf)) : this.uh += Math.abs(c);
        0 != c && (this.kf = 0); - 1 == this.Ih && 0 < c && (this.Ih = 0 <= Ye ? L() - Ye : -1);
        this.hf = b;
        return 1 == Yg(this) ? d : a
    };
    Ug.prototype.vd = function(a, b) {
        return this.sj ? 0 : this.ib ? 1 : O.prototype.vd.call(this, a, b)
    };
    Ug.prototype.Ha = function() {
        return 1
    };
    Ug.prototype.getDuration = function() {
        return this.fb
    };
    var Zg = function(a, b) {
            Ya(a.qd, function(a) {
                return a.bf() && a.Vc() == b.Vc()
            }) || a.qd.push(b)
        },
        Xg = function(a, b, c) {
            return 15E3 <= b ? !0 : a.pi ? (void 0 === c ? 0 : c) ? !0 : $g(a.fb) ? b >= a.fb / 2 : $g(a.Uf) ? b >= a.Uf : !1 : !1
        },
        $g = function(a) {
            return 1 == K(M.g().u, "gmpd") ? 0 < a : -1 != a
        },
        ah = function(a) {
            var b = {},
                c = M.g();
            b.insideIframe = c.jb;
            b.unmeasurable = a.bd;
            b.position = a.position;
            b.exposure = a.Y.A;
            b.documentSize = c.dc;
            b.viewportSize = c.Ra;
            null != a.sf && (b.presenceData = a.sf);
            return b
        },
        ch = function(a, b) {
            bh(a.Wa, b, function() {
                return {
                    mn: 0,
                    $e: void 0
                }
            });
            a.Wa[b] = {
                viewableArea: gg(a.Y.A, 2),
                instantaneousState: a.X.Md
            }
        },
        bh = function(a, b, c) {
            for (var d = a.length; d < b + 1;) a.push(c()), d++
        },
        dh = function(a, b, c) {
            var d = a.si[b];
            if (null != d) return d;
            0 <= Ua(Dg, b) ? d = !0 : (d = a.mb[b], u(d) ? (a.mb[b] = !0, d = !d) : d = !1);
            c = a.Ue(d, d, c, Tg[b]);
            "fully_viewable_audible_half_duration_impression" == b && (c.std = "csm", c.ic = Ig(a.X, ["gdr"]));
            return c
        };
    Ug.prototype.Ue = function(a, b, c, d) {
        if (this.bd) return {
            "if": 0
        };
        var e = this.position.clone();
        e.round();
        var f = Wa(this.Wa, function(a) {
                return 100 * a.mn | 0
            }),
            g = M.g(),
            h = this.ua,
            k = {};
        k["if"] = g.jb ? 1 : void 0;
        k.sdk = this.ob ? this.ob : void 0;
        k.t = this.Um;
        k.p = [e.top, e.left, e.bottom, e.right];
        k.tos = h.$a.la(!1);
        k.mtos = h.$a.Ua();
        k.mcvt = h.ri.Ua();
        k.ps = void 0;
        k.pt = f;
        e = Ng(h, L(), 2 == this.V);
        k.vht = e;
        k.mut = h.Ak.Ua();
        k.a = Wg(this.Y.volume);
        k.mv = Wg(h.Rd);
        k.fs = this.ib ? 1 : 0;
        k.ft = h.Se.la();
        k.at = h.Nc.la();
        k.as = .1 <= h.uc ? 1 : 0;
        k.atos = h.qb.la();
        k.amtos = h.qb.Ua();
        k.uac = this.xk;
        k.vpt = h.Eb.la();
        "nio" == g.l && (k.nio = 1, k.avms = "nio");
        k.gmm = "4";
        k.gdr = Xg(this, h.Eb.la(), !0) ? 1 : 0;
        this.ki && (k.efpf = this.xg);
        0 < this.zh && (k.nnut = this.zh);
        k.tcm = Yg(this);
        k.nmt = this.uh;
        k.bt = this.lg;
        k.pst = this.Ih;
        k.vpaid = this.gf;
        k.dur = this.fb;
        k.vmtime = this.hf;
        k.is = this.X.Md;
        1 <= this.Wa.length && (k.i0 = this.Wa[0].$e);
        2 <= this.Wa.length && (k.i1 = this.Wa[1].$e);
        3 <= this.Wa.length && (k.i2 = this.Wa[2].$e);
        4 <= this.Wa.length && (k.i3 = this.Wa[3].$e);
        k.cs = Kg(this.X);
        a && (k.ic = Jg(this.X), k.dvpt = h.Eb.Tc(),
            k.dvs = yf(h.$a, .5), k.dfvs = yf(h.$a, 1), k.davs = yf(h.qb, .5), k.dafvs = yf(h.qb, 1), b && (h.Eb.Bc(), h.$a.Bc(), h.qb.Bc()), this.qc() && (k.dtos = h.Yf, k.dav = h.Ce, k.dtoss = this.vg + 1, b && (h.Yf = 0, h.Ce = 0, this.vg++)), k.dat = h.Nc.Tc(), k.dft = h.Se.Tc(), b && (h.Nc.Bc(), h.Se.Bc()));
        g.dc && (k.ps = [g.dc.width, g.dc.height]);
        g.Ra && (k.bs = [g.Ra.width, g.Ra.height]);
        g.de && (k.scs = [g.de.width, g.de.height]);
        k.dom = g.domain;
        this.pd && (k.vds = this.pd);
        if (0 < this.qd.length || this.Sd) a = gb(this.qd), this.Sd && a.push(this.Sd), k.pings = Wa(a, function(a) {
            return a.toString()
        });
        k.ces = Wa(Va(this.qd, function(a) {
            return a.bf()
        }), function(a) {
            return a.Vc()
        });
        this.F && (k.vmer = this.F);
        this.qe && (k.vmmk = this.qe);
        this.Tf && (k.vmiec = this.Tf);
        k.avms = this.l ? this.l.getName() : M.g().l;
        this.l && Qb(k, this.l.Ga());
        "exc" == g.l && (k.femt = this.El, k.femvt = this.ln, k.emc = this.pm, k.emb = this.Cl.la(!1), k.emuc = this.Dl, k.avms = "exc");
        c ? (k.c = gg(this.Y.A, 2), k.ss = gg(eh(this), 2)) : k.tth = L() - Xe;
        k.mc = gg(h.oh, 2);
        k.nc = gg(h.Vd, 2);
        k.mv = Wg(h.Rd);
        k.nv = Wg(h.uc);
        k.lte = gg(this.lh, 2);
        c = this.hd[null != d && d < this.hd.length ? d : this.hd.length -
            1];
        h.$a.Ua();
        k.qmtos = c.$a.Ua();
        k.qnc = gg(c.Vd, 2);
        k.qmv = Wg(c.Rd);
        k.qnv = Wg(c.uc);
        k.qas = .1 <= c.uc ? 1 : 0;
        k.qi = this.va;
        null !== this.$g && (k.nvat = this.$g ? 1 : 0);
        k.avms || (k.avms = "geo");
        k.psm = h.Gh.Td;
        k.psv = h.Gh.Kd();
        k.psfv = h.Rj.Kd();
        k.psa = h.Qj.Kd();
        g = wd(g.u);
        g.length && (k.veid = g);
        this.sf && Qb(k, this.sf.Sn());
        return k
    };
    var eh = function(a) {
        if (a.ib) return 1;
        var b = H.screen.width * H.screen.height;
        return 0 >= b ? -1 : Math.min(a.Hb * a.Y.A / b, 1)
    };
    Ha();
    var fh = function() {
            this.Gi = [];
            this.wa = null;
            this.Fd = [];
            this.Rg = !1
        },
        gh = function(a, b) {
            a.wa = bb(a.Gi, function(b) {
                if (null == b || !b.Cc()) return !1;
                if (b.init()) return !0;
                a.Fd.push(b);
                return !1
            });
            !a.wa && a.Fd.length && (a.Rg = !0, b("msf"));
            return null != a.wa
        };
    l = fh.prototype;
    l.getName = function() {
        return this.wa ? this.wa.getName() : "na"
    };
    l.Ga = function() {
        var a = {};
        A(this.Fd, function(b) {
            Qb(a, b.Ga())
        });
        return a
    };
    l.Mb = function() {
        return this.wa ? this.wa.Mb() : 0
    };
    l.Nb = function() {
        return this.Rg
    };
    l.Uc = function() {
        return this.Rg ? "msf" : "uk"
    };
    za(fh);
    var hh = function() {
        this.Da = this.Da;
        this.pf = this.pf
    };
    hh.prototype.Da = !1;
    hh.prototype.Ba = function() {
        this.Da || (this.Da = !0, this.Ca())
    };
    hh.prototype.Ca = function() {
        if (this.pf)
            for (; this.pf.length;) this.pf.shift()()
    };
    var ih = function(a, b) {
        this.type = a;
        this.currentTarget = this.target = b;
        this.defaultPrevented = this.yc = !1;
        this.fk = !0
    };
    ih.prototype.stopPropagation = function() {
        this.yc = !0
    };
    ih.prototype.preventDefault = function() {
        this.defaultPrevented = !0;
        this.fk = !1
    };
    var jh = Object.freeze || function(a) {
        return a
    };
    var kh = !C || 9 <= Number(mc),
        lh = C && !lc("9"),
        mh = function() {
            if (!r.addEventListener || !Object.defineProperty) return !1;
            var a = !1,
                b = Object.defineProperty({}, "passive", {
                    get: function() {
                        a = !0
                    }
                });
            r.addEventListener("test", ya, b);
            r.removeEventListener("test", ya, b);
            return a
        }();
    var nh = function(a, b) {
        ih.call(this, a ? a.type : "");
        this.relatedTarget = this.currentTarget = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
        this.key = "";
        this.charCode = this.keyCode = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.state = null;
        this.pointerId = 0;
        this.pointerType = "";
        this.Jb = null;
        a && this.init(a, b)
    };
    Ja(nh, ih);
    var oh = jh({
        2: "touch",
        3: "pen",
        4: "mouse"
    });
    nh.prototype.init = function(a, b) {
        var c = this.type = a.type,
            d = a.changedTouches ? a.changedTouches[0] : null;
        this.target = a.target || a.srcElement;
        this.currentTarget = b;
        (b = a.relatedTarget) ? $b && (Ub(b, "nodeName") || (b = null)): "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
        this.relatedTarget = b;
        null === d ? (this.offsetX = ac || void 0 !== a.offsetX ? a.offsetX : a.layerX, this.offsetY = ac || void 0 !== a.offsetY ? a.offsetY : a.layerY, this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY :
            a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0) : (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0);
        this.button = a.button;
        this.keyCode = a.keyCode || 0;
        this.key = a.key || "";
        this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.metaKey = a.metaKey;
        this.pointerId = a.pointerId || 0;
        this.pointerType = v(a.pointerType) ? a.pointerType :
            oh[a.pointerType] || "";
        this.state = a.state;
        this.Jb = a;
        a.defaultPrevented && this.preventDefault()
    };
    nh.prototype.stopPropagation = function() {
        nh.Ec.stopPropagation.call(this);
        this.Jb.stopPropagation ? this.Jb.stopPropagation() : this.Jb.cancelBubble = !0
    };
    nh.prototype.preventDefault = function() {
        nh.Ec.preventDefault.call(this);
        var a = this.Jb;
        if (a.preventDefault) a.preventDefault();
        else if (a.returnValue = !1, lh) try {
            if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
        } catch (b) {}
    };
    var ph = "closure_listenable_" + (1E6 * Math.random() | 0),
        qh = function(a) {
            return !(!a || !a[ph])
        },
        rh = 0;
    var sh = function(a, b, c, d, e) {
            this.listener = a;
            this.xf = null;
            this.src = b;
            this.type = c;
            this.capture = !!d;
            this.Xe = e;
            this.key = ++rh;
            this.jd = this.Ge = !1
        },
        th = function(a) {
            a.jd = !0;
            a.listener = null;
            a.xf = null;
            a.src = null;
            a.Xe = null
        };
    var uh = function(a) {
        this.src = a;
        this.ga = {};
        this.ne = 0
    };
    uh.prototype.add = function(a, b, c, d, e) {
        var f = a.toString();
        a = this.ga[f];
        a || (a = this.ga[f] = [], this.ne++);
        var g = vh(a, b, d, e); - 1 < g ? (b = a[g], c || (b.Ge = !1)) : (b = new sh(b, this.src, f, !!d, e), b.Ge = c, a.push(b));
        return b
    };
    uh.prototype.remove = function(a, b, c, d) {
        a = a.toString();
        if (!(a in this.ga)) return !1;
        var e = this.ga[a];
        b = vh(e, b, c, d);
        return -1 < b ? (th(e[b]), db(e, b), 0 == e.length && (delete this.ga[a], this.ne--), !0) : !1
    };
    var wh = function(a, b) {
        var c = b.type;
        c in a.ga && eb(a.ga[c], b) && (th(b), 0 == a.ga[c].length && (delete a.ga[c], a.ne--))
    };
    uh.prototype.Oh = function(a) {
        a = a && a.toString();
        var b = 0,
            c;
        for (c in this.ga)
            if (!a || c == a) {
                for (var d = this.ga[c], e = 0; e < d.length; e++) ++b, th(d[e]);
                delete this.ga[c];
                this.ne--
            }
    };
    uh.prototype.Id = function(a, b, c, d) {
        a = this.ga[a.toString()];
        var e = -1;
        a && (e = vh(a, b, c, d));
        return -1 < e ? a[e] : null
    };
    uh.prototype.hasListener = function(a, b) {
        var c = u(a),
            d = c ? a.toString() : "",
            e = u(b);
        return Jb(this.ga, function(a) {
            for (var f = 0; f < a.length; ++f)
                if (!(c && a[f].type != d || e && a[f].capture != b)) return !0;
            return !1
        })
    };
    var vh = function(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.jd && f.listener == b && f.capture == !!c && f.Xe == d) return e
        }
        return -1
    };
    var xh = "closure_lm_" + (1E6 * Math.random() | 0),
        yh = {},
        zh = 0,
        Bh = function(a, b, c, d, e) {
            if (d && d.once) return Ah(a, b, c, d, e);
            if (Ba(b)) {
                for (var f = 0; f < b.length; f++) Bh(a, b[f], c, d, e);
                return null
            }
            c = Ch(c);
            return qh(a) ? a.ma(b, c, Da(d) ? !!d.capture : !!d, e) : Dh(a, b, c, !1, d, e)
        },
        Dh = function(a, b, c, d, e, f) {
            if (!b) throw Error("Invalid event type");
            var g = Da(e) ? !!e.capture : !!e,
                h = Eh(a);
            h || (a[xh] = h = new uh(a));
            c = h.add(b, c, d, g, f);
            if (c.xf) return c;
            d = Fh();
            c.xf = d;
            d.src = a;
            d.listener = c;
            if (a.addEventListener) mh || (e = g), void 0 === e && (e = !1), a.addEventListener(b.toString(),
                d, e);
            else if (a.attachEvent) a.attachEvent(Gh(b.toString()), d);
            else if (a.addListener && a.removeListener) z("change" === b, "MediaQueryList only has a change event"), a.addListener(d);
            else throw Error("addEventListener and attachEvent are unavailable.");
            zh++;
            return c
        },
        Fh = function() {
            var a = Hh,
                b = kh ? function(c) {
                    return a.call(b.src, b.listener, c)
                } : function(c) {
                    c = a.call(b.src, b.listener, c);
                    if (!c) return c
                };
            return b
        },
        Ah = function(a, b, c, d, e) {
            if (Ba(b)) {
                for (var f = 0; f < b.length; f++) Ah(a, b[f], c, d, e);
                return null
            }
            c = Ch(c);
            return qh(a) ?
                a.Aj(b, c, Da(d) ? !!d.capture : !!d, e) : Dh(a, b, c, !0, d, e)
        },
        Ih = function(a, b, c, d, e) {
            if (Ba(b))
                for (var f = 0; f < b.length; f++) Ih(a, b[f], c, d, e);
            else d = Da(d) ? !!d.capture : !!d, c = Ch(c), qh(a) ? a.ii(b, c, d, e) : a && (a = Eh(a)) && (b = a.Id(b, c, d, e)) && Jh(b)
        },
        Jh = function(a) {
            if (!w(a) && a && !a.jd) {
                var b = a.src;
                if (qh(b)) wh(b.Ta, a);
                else {
                    var c = a.type,
                        d = a.xf;
                    b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(Gh(c), d) : b.addListener && b.removeListener && b.removeListener(d);
                    zh--;
                    (c = Eh(b)) ? (wh(c, a), 0 == c.ne && (c.src =
                        null, b[xh] = null)) : th(a)
                }
            }
        },
        Gh = function(a) {
            return a in yh ? yh[a] : yh[a] = "on" + a
        },
        Lh = function(a, b, c, d) {
            var e = !0;
            if (a = Eh(a))
                if (b = a.ga[b.toString()])
                    for (b = b.concat(), a = 0; a < b.length; a++) {
                        var f = b[a];
                        f && f.capture == c && !f.jd && (f = Kh(f, d), e = e && !1 !== f)
                    }
            return e
        },
        Kh = function(a, b) {
            var c = a.listener,
                d = a.Xe || a.src;
            a.Ge && Jh(a);
            return c.call(d, b)
        },
        Hh = function(a, b) {
            if (a.jd) return !0;
            if (!kh) {
                var c = b || xa("window.event");
                b = new nh(c, this);
                var d = !0;
                if (!(0 > c.keyCode || void 0 != c.returnValue)) {
                    a: {
                        var e = !1;
                        if (0 == c.keyCode) try {
                            c.keyCode = -1;
                            break a
                        } catch (g) {
                            e = !0
                        }
                        if (e || void 0 == c.returnValue) c.returnValue = !0
                    }
                    c = [];
                    for (e = b.currentTarget; e; e = e.parentNode) c.push(e);a = a.type;
                    for (e = c.length - 1; !b.yc && 0 <= e; e--) {
                        b.currentTarget = c[e];
                        var f = Lh(c[e], a, !0, b);
                        d = d && f
                    }
                    for (e = 0; !b.yc && e < c.length; e++) b.currentTarget = c[e],
                    f = Lh(c[e], a, !1, b),
                    d = d && f
                }
                return d
            }
            return Kh(a, new nh(b, this))
        },
        Eh = function(a) {
            a = a[xh];
            return a instanceof uh ? a : null
        },
        Mh = "__closure_events_fn_" + (1E9 * Math.random() >>> 0),
        Ch = function(a) {
            z(a, "Listener can not be null.");
            if (x(a)) return a;
            z(a.handleEvent,
                "An object listener must have handleEvent method.");
            a[Mh] || (a[Mh] = function(b) {
                return a.handleEvent(b)
            });
            return a[Mh]
        };
    var Q = function() {
        hh.call(this);
        this.Ta = new uh(this);
        this.bl = this;
        this.Dh = null
    };
    Ja(Q, hh);
    Q.prototype[ph] = !0;
    l = Q.prototype;
    l.addEventListener = function(a, b, c, d) {
        Bh(this, a, b, c, d)
    };
    l.removeEventListener = function(a, b, c, d) {
        Ih(this, a, b, c, d)
    };
    l.dispatchEvent = function(a) {
        Nh(this);
        var b = this.Dh;
        if (b) {
            var c = [];
            for (var d = 1; b; b = b.Dh) c.push(b), z(1E3 > ++d, "infinite loop")
        }
        b = this.bl;
        d = a.type || a;
        if (v(a)) a = new ih(a, b);
        else if (a instanceof ih) a.target = a.target || b;
        else {
            var e = a;
            a = new ih(d, b);
            Qb(a, e)
        }
        e = !0;
        if (c)
            for (var f = c.length - 1; !a.yc && 0 <= f; f--) {
                var g = a.currentTarget = c[f];
                e = Oh(g, d, !0, a) && e
            }
        a.yc || (g = a.currentTarget = b, e = Oh(g, d, !0, a) && e, a.yc || (e = Oh(g, d, !1, a) && e));
        if (c)
            for (f = 0; !a.yc && f < c.length; f++) g = a.currentTarget = c[f], e = Oh(g, d, !1, a) && e;
        return e
    };
    l.Ca = function() {
        Q.Ec.Ca.call(this);
        this.Ta && this.Ta.Oh(void 0);
        this.Dh = null
    };
    l.ma = function(a, b, c, d) {
        Nh(this);
        return this.Ta.add(String(a), b, !1, c, d)
    };
    l.Aj = function(a, b, c, d) {
        return this.Ta.add(String(a), b, !0, c, d)
    };
    l.ii = function(a, b, c, d) {
        this.Ta.remove(String(a), b, c, d)
    };
    var Oh = function(a, b, c, d) {
        b = a.Ta.ga[String(b)];
        if (!b) return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var g = b[f];
            if (g && !g.jd && g.capture == c) {
                var h = g.listener,
                    k = g.Xe || g.src;
                g.Ge && wh(a.Ta, g);
                e = !1 !== h.call(k, d) && e
            }
        }
        return e && 0 != d.fk
    };
    Q.prototype.Id = function(a, b, c, d) {
        return this.Ta.Id(String(a), b, c, d)
    };
    Q.prototype.hasListener = function(a, b) {
        return this.Ta.hasListener(u(a) ? String(a) : void 0, b)
    };
    var Nh = function(a) {
        z(a.Ta, "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?")
    };
    var Ph = function(a, b) {
        this.$l = 100;
        this.tl = a;
        this.Pm = b;
        this.mf = 0;
        this.sa = null
    };
    Ph.prototype.get = function() {
        if (0 < this.mf) {
            this.mf--;
            var a = this.sa;
            this.sa = a.next;
            a.next = null
        } else a = this.tl();
        return a
    };
    Ph.prototype.put = function(a) {
        this.Pm(a);
        this.mf < this.$l && (this.mf++, a.next = this.sa, this.sa = a)
    };
    var Qh = function(a) {
            r.setTimeout(function() {
                throw a;
            }, 0)
        },
        Rh, Sh = function() {
            var a = r.MessageChannel;
            "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !B("Presto") && (a = function() {
                var a = document.createElement("IFRAME");
                a.style.display = "none";
                a.src = "";
                document.documentElement.appendChild(a);
                var b = a.contentWindow;
                a = b.document;
                a.open();
                a.write("");
                a.close();
                var c = "callImmediate" + Math.random(),
                    d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host;
                a = y(function(a) {
                    if (("*" == d || a.origin == d) && a.data == c) this.port1.onmessage()
                }, this);
                b.addEventListener("message", a, !1);
                this.port1 = {};
                this.port2 = {
                    postMessage: function() {
                        b.postMessage(c, d)
                    }
                }
            });
            if ("undefined" !== typeof a && !B("Trident") && !B("MSIE")) {
                var b = new a,
                    c = {},
                    d = c;
                b.port1.onmessage = function() {
                    if (u(c.next)) {
                        c = c.next;
                        var a = c.Ji;
                        c.Ji = null;
                        a()
                    }
                };
                return function(a) {
                    d.next = {
                        Ji: a
                    };
                    d = d.next;
                    b.port2.postMessage(0)
                }
            }
            return "undefined" !== typeof document && "onreadystatechange" in document.createElement("SCRIPT") ?
                function(a) {
                    var b = document.createElement("SCRIPT");
                    b.onreadystatechange = function() {
                        b.onreadystatechange = null;
                        b.parentNode.removeChild(b);
                        b = null;
                        a();
                        a = null
                    };
                    document.documentElement.appendChild(b)
                } : function(a) {
                    r.setTimeout(a, 0)
                }
        };
    var Th = function() {
            this.$f = this.Jc = null
        },
        Vh = new Ph(function() {
            return new Uh
        }, function(a) {
            a.reset()
        });
    Th.prototype.add = function(a, b) {
        var c = Vh.get();
        c.set(a, b);
        this.$f ? this.$f.next = c : (z(!this.Jc), this.Jc = c);
        this.$f = c
    };
    Th.prototype.remove = function() {
        var a = null;
        this.Jc && (a = this.Jc, this.Jc = this.Jc.next, this.Jc || (this.$f = null), a.next = null);
        return a
    };
    var Uh = function() {
        this.next = this.scope = this.Gg = null
    };
    Uh.prototype.set = function(a, b) {
        this.Gg = a;
        this.scope = b;
        this.next = null
    };
    Uh.prototype.reset = function() {
        this.next = this.scope = this.Gg = null
    };
    var $h = function(a, b) {
            Wh || Xh();
            Yh || (Wh(), Yh = !0);
            Zh.add(a, b)
        },
        Wh, Xh = function() {
            if (r.Promise && r.Promise.resolve) {
                var a = r.Promise.resolve(void 0);
                Wh = function() {
                    a.then(ai)
                }
            } else Wh = function() {
                var a = ai;
                !x(r.setImmediate) || r.Window && r.Window.prototype && !B("Edge") && r.Window.prototype.setImmediate == r.setImmediate ? (Rh || (Rh = Sh()), Rh(a)) : r.setImmediate(a)
            }
        },
        Yh = !1,
        Zh = new Th,
        ai = function() {
            for (var a; a = Zh.remove();) {
                try {
                    a.Gg.call(a.scope)
                } catch (b) {
                    Qh(b)
                }
                Vh.put(a)
            }
            Yh = !1
        };
    var di = function(a, b) {
            this.za = 0;
            this.dk = void 0;
            this.Pc = this.rb = this.Ma = null;
            this.We = this.Cg = !1;
            if (a != ya) try {
                var c = this;
                a.call(b, function(a) {
                    bi(c, 2, a)
                }, function(a) {
                    if (!(a instanceof ci)) try {
                        if (a instanceof Error) throw a;
                        throw Error("Promise rejected.");
                    } catch (e) {}
                    bi(c, 3, a)
                })
            } catch (d) {
                bi(this, 3, d)
            }
        },
        ei = function() {
            this.next = this.context = this.ed = this.wc = this.bc = null;
            this.Be = !1
        };
    ei.prototype.reset = function() {
        this.context = this.ed = this.wc = this.bc = null;
        this.Be = !1
    };
    var fi = new Ph(function() {
            return new ei
        }, function(a) {
            a.reset()
        }),
        gi = function(a, b, c) {
            var d = fi.get();
            d.wc = a;
            d.ed = b;
            d.context = c;
            return d
        },
        hi = function(a) {
            if (a instanceof di) return a;
            var b = new di(ya);
            bi(b, 2, a);
            return b
        },
        ii = function(a) {
            return new di(function(b, c) {
                c(a)
            })
        },
        ki = function(a, b, c) {
            ji(a, b, c, null) || $h(Ga(b, a))
        },
        li = function(a) {
            return new di(function(b, c) {
                var d = a.length,
                    e = [];
                if (d)
                    for (var f = function(a, c) {
                            d--;
                            e[a] = c;
                            0 == d && b(e)
                        }, g = function(a) {
                            c(a)
                        }, h = 0, k; h < a.length; h++) k = a[h], ki(k, Ga(f, h), g);
                else b(e)
            })
        };
    di.prototype.then = function(a, b, c) {
        null != a && Sa(a, "opt_onFulfilled should be a function.");
        null != b && Sa(b, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?");
        return mi(this, x(a) ? a : null, x(b) ? b : null, c)
    };
    di.prototype.then = di.prototype.then;
    di.prototype.$goog_Thenable = !0;
    var ni = function(a, b) {
        return mi(a, null, b, void 0)
    };
    di.prototype.cancel = function(a) {
        0 == this.za && $h(function() {
            var b = new ci(a);
            oi(this, b)
        }, this)
    };
    var oi = function(a, b) {
            if (0 == a.za)
                if (a.Ma) {
                    var c = a.Ma;
                    if (c.rb) {
                        for (var d = 0, e = null, f = null, g = c.rb; g && (g.Be || (d++, g.bc == a && (e = g), !(e && 1 < d))); g = g.next) e || (f = g);
                        e && (0 == c.za && 1 == d ? oi(c, b) : (f ? (d = f, z(c.rb), z(null != d), d.next == c.Pc && (c.Pc = d), d.next = d.next.next) : pi(c), qi(c, e, 3, b)))
                    }
                    a.Ma = null
                } else bi(a, 3, b)
        },
        si = function(a, b) {
            a.rb || 2 != a.za && 3 != a.za || ri(a);
            z(null != b.wc);
            a.Pc ? a.Pc.next = b : a.rb = b;
            a.Pc = b
        },
        mi = function(a, b, c, d) {
            var e = gi(null, null, null);
            e.bc = new di(function(a, g) {
                e.wc = b ? function(c) {
                    try {
                        var e = b.call(d, c);
                        a(e)
                    } catch (m) {
                        g(m)
                    }
                } : a;
                e.ed = c ? function(b) {
                    try {
                        var e = c.call(d, b);
                        !u(e) && b instanceof ci ? g(b) : a(e)
                    } catch (m) {
                        g(m)
                    }
                } : g
            });
            e.bc.Ma = a;
            si(a, e);
            return e.bc
        };
    di.prototype.$m = function(a) {
        z(1 == this.za);
        this.za = 0;
        bi(this, 2, a)
    };
    di.prototype.an = function(a) {
        z(1 == this.za);
        this.za = 0;
        bi(this, 3, a)
    };
    var bi = function(a, b, c) {
            0 == a.za && (a === c && (b = 3, c = new TypeError("Promise cannot resolve to itself")), a.za = 1, ji(c, a.$m, a.an, a) || (a.dk = c, a.za = b, a.Ma = null, ri(a), 3 != b || c instanceof ci || ti(a, c)))
        },
        ji = function(a, b, c, d) {
            if (a instanceof di) return null != b && Sa(b, "opt_onFulfilled should be a function."), null != c && Sa(c, "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"), si(a, gi(b || ya, c || null, d)), !0;
            if (a) try {
                var e = !!a.$goog_Thenable
            } catch (g) {
                e = !1
            } else e = !1;
            if (e) return a.then(b, c, d), !0;
            if (Da(a)) try {
                var f = a.then;
                if (x(f)) return ui(a, f, b, c, d), !0
            } catch (g) {
                return c.call(d, g), !0
            }
            return !1
        },
        ui = function(a, b, c, d, e) {
            var f = !1,
                g = function(a) {
                    f || (f = !0, c.call(e, a))
                },
                h = function(a) {
                    f || (f = !0, d.call(e, a))
                };
            try {
                b.call(a, g, h)
            } catch (k) {
                h(k)
            }
        },
        ri = function(a) {
            a.Cg || (a.Cg = !0, $h(a.Al, a))
        },
        pi = function(a) {
            var b = null;
            a.rb && (b = a.rb, a.rb = b.next, b.next = null);
            a.rb || (a.Pc = null);
            null != b && z(null != b.wc);
            return b
        };
    di.prototype.Al = function() {
        for (var a; a = pi(this);) qi(this, a, this.za, this.dk);
        this.Cg = !1
    };
    var qi = function(a, b, c, d) {
            if (3 == c && b.ed && !b.Be)
                for (; a && a.We; a = a.Ma) a.We = !1;
            if (b.bc) b.bc.Ma = null, vi(b, c, d);
            else try {
                b.Be ? b.wc.call(b.context) : vi(b, c, d)
            } catch (e) {
                wi.call(null, e)
            }
            fi.put(b)
        },
        vi = function(a, b, c) {
            2 == b ? a.wc.call(a.context, c) : a.ed && a.ed.call(a.context, c)
        },
        ti = function(a, b) {
            a.We = !0;
            $h(function() {
                a.We && wi.call(null, b)
            })
        },
        wi = Qh,
        ci = function(a) {
            La.call(this, a)
        };
    Ja(ci, La);
    ci.prototype.name = "cancel";
    var xi = function(a, b, c) {
        if (x(a)) c && (a = y(a, c));
        else if (a && "function" == typeof a.handleEvent) a = y(a.handleEvent, a);
        else throw Error("Invalid listener argument");
        return 2147483647 < Number(b) ? -1 : r.setTimeout(a, b || 0)
    };
    var yi = function(a, b, c) {
        hh.call(this);
        this.dm = null != c ? y(a, c) : a;
        this.Vl = b;
        this.rl = y(this.Am, this);
        this.ig = []
    };
    Ja(yi, hh);
    l = yi.prototype;
    l.ld = !1;
    l.$d = 0;
    l.H = null;
    l.$i = function(a) {
        this.ig = arguments;
        this.H || this.$d ? this.ld = !0 : zi(this)
    };
    l.stop = function() {
        this.H && (r.clearTimeout(this.H), this.H = null, this.ld = !1, this.ig = [])
    };
    l.pause = function() {
        this.$d++
    };
    l.resume = function() {
        this.$d--;
        this.$d || !this.ld || this.H || (this.ld = !1, zi(this))
    };
    l.Ca = function() {
        yi.Ec.Ca.call(this);
        this.stop()
    };
    l.Am = function() {
        this.H = null;
        this.ld && !this.$d && (this.ld = !1, zi(this))
    };
    var zi = function(a) {
        a.H = xi(a.rl, a.Vl);
        a.dm.apply(null, a.ig)
    };
    var Ai = function() {
            this.Vf = this.kg = this.Ra = null
        },
        Bi = function() {
            this.pa = [];
            this.cc = [];
            this.done = !1;
            this.Sa = {
                dl: 0,
                zi: 0,
                Uh: 0,
                Oi: 0,
                Xg: -1
            };
            this.mj = this.be = this.jj = this.ee = this.kj = null;
            this.sk = !1;
            this.Im = "";
            this.Le = null;
            this.$c = cf() || df();
            this.uk = 0;
            this.Ya = new af(this)
        },
        Ci = function() {
            var a = M.g().l;
            return "nio" == a || "aio" == a
        },
        Ei = function() {
            var a = R;
            if (!a.sk) {
                a.sk = !0;
                if (!a.kj && !Ci()) {
                    var b = Ce(137, function(b) {
                        for (var c = [], e = 0; e < arguments.length; ++e) c[e - 0] = arguments[e];
                        return a.ij.apply(a, oa(c))
                    });
                    a.ee = new yi(b,
                        100);
                    a.kj = Fe(H, "scroll", function(b) {
                        for (var c = [], e = 0; e < arguments.length; ++e) c[e - 0] = arguments[e];
                        z(null !== a.ee);
                        null !== a.ee && a.ee.$i.apply(a.ee, oa(c))
                    }, 138)
                }
                a.jj || Ci() || (b = Ce(140, function(b) {
                    for (var c = [], e = 0; e < arguments.length; ++e) c[e - 0] = arguments[e];
                    return a.hm.apply(a, oa(c))
                }), a.be = new yi(b, 100), a.jj = Fe(H, "resize", function(b) {
                    for (var c = [], e = 0; e < arguments.length; ++e) c[e - 0] = arguments[e];
                    z(null !== a.be);
                    null !== a.be && a.be.$i.apply(a.be, oa(c))
                }, 141));
                Di(a, function(b) {
                    for (var c = [], e = 0; e < arguments.length; ++e) c[e -
                        0] = arguments[e];
                    return a.lj.apply(a, oa(c))
                });
                a.lj()
            }
        };
    Bi.prototype.hm = function() {
        Fi(this, !1);
        this.ij()
    };
    Bi.prototype.ij = function() {
        Gi(this, Hi(this), !1)
    };
    var Ii = function(a) {
        var b = M.g();
        b.Va || "exc" == b.l || Fi(a, !0);
        var c = new Ai;
        switch (b.l) {
            case "geo":
                a: {
                    b = b.Ra;c = new Ai;c.Ra = b;
                    if (null != b && -12245933 != b.width && -12245933 != b.height) {
                        var d = M.g();
                        if (d.Va) var e = d.Dd;
                        else try {
                            d = H;
                            var f = a.$c;
                            d = d.top;
                            var g = b || kd(!0, d, void 0 === f ? !1 : f),
                                h = Rc(Nc(d.document).ec);
                            if (-12245933 == g.width) {
                                var k = g.width;
                                var m = new G(k, k, k, k)
                            } else m = new G(h.y, h.x + g.width, h.y + g.height, h.x);
                            e = m
                        } catch (n) {
                            a = c;
                            break a
                        }
                        c.Vf = e
                    }
                    a = c
                }
                return a;
            default:
                return c
        }
    };
    Bi.prototype.gk = function() {
        Gi(this, Hi(this), !1)
    };
    var Gi = function(a, b, c, d) {
            if (!a.done) {
                a.Ya.cancel();
                var e = M.g(),
                    f = !!K(e.u, "spna");
                if (0 == b.length) f || c || bf(a.Ya);
                else {
                    a.Le = null;
                    f = Ii(a);
                    try {
                        var g = L();
                        M.g().Fl = g;
                        if (null != fh.g().wa)
                            for (d = 0; d < b.length; d++) eg(b[d], g, c);
                        else switch (e.l) {
                            case "exc":
                                for (d = 0; d < b.length; d++) cg(b[d], g, c);
                                break;
                            case "nis":
                                for (e = 0; e < b.length; e++) u(d) ? b[e].Nf(d) : b[e].Fj(g);
                                break;
                            case "gsv":
                                for (e = 0; e < b.length; e++) u(d) ? b[e].hj(d) : b[e].Ej(g);
                                break;
                            case "aio":
                            case "nio":
                                for (d = 0; d < b.length; d++) cg(b[d], g, c);
                                break;
                            case "iem":
                                for (d = 0; d <
                                    b.length; d++) $f(b[d], g, c);
                                break;
                            case "geo":
                                if (f.Vf)
                                    for (z(null != f.Vf), d = 0; d < b.length; d++) bg(b[d], g, f.Vf, c, e.jb)
                        }
                        for (d = 0; d < b.length; d++) fg(b[d]);
                        a.Sa.Uh += L() - g;
                        ++a.Sa.Oi;
                        Ji(a)
                    } finally {
                        c ? A(b, function(a) {
                            a.Y.A = 0
                        }) : bf(a.Ya)
                    }
                }
            }
        },
        Di = function(a, b) {
            var c;
            ld.visibilityState ? c = "visibilitychange" : ld.mozVisibilityState ? c = "mozvisibilitychange" : ld.webkitVisibilityState && (c = "webkitvisibilitychange");
            c && (a.mj = a.mj || Fe(ld, c, b, 142))
        };
    Bi.prototype.lj = function() {
        var a = this.P(),
            b = L();
        a ? (Ze || (Ve = b, A(this.pa, function(a) {
            var c = a.ua;
            c.oi = Ng(c, b, 1 != a.V)
        })), Ze = !0, Fi(this, !0)) : (this.uk = Ki(this, b), Ze = !1, Xe = b, A(this.pa, function(a) {
            a.gc && (a.ua.ie = b)
        }));
        Gi(this, Hi(this), !a)
    };
    Bi.prototype.Zm = function(a) {
        var b;
        if (b = null != a.IntersectionObserver) {
            if (a = Li(a, Hi(this))) M.g().l = "nio";
            b = a
        }
        return b
    };
    Bi.prototype.Ym = function(a) {
        return C && lc(8) && x(rf(a && a.document)) ? (M.g().l = "iem", !0) : !1
    };
    Bi.prototype.P = function() {
        if (Mi(this)) return !0;
        var a = Je(),
            b = 1 === a;
        a = 0 === a;
        return M.g().Ki ? b : b || a
    };
    var Ni = function(a, b) {
            return null != b && Ya(a.pa, function(a) {
                return a.element == b
            })
        },
        Oi = function(a) {
            return bb(R.pa, function(b) {
                return b.va == a
            })
        },
        Hi = function(a) {
            return 0 == a.pa.length ? a.cc : 0 == a.cc.length ? a.pa : fb(a.cc, a.pa)
        };
    Bi.prototype.reset = function() {
        this.pa = [];
        this.cc = []
    };
    var Fi = function(a, b) {
            a = a.$c;
            var c = M.g(),
                d, e = fh.g();
            null != e.wa && (d = e.wa.B);
            c.Ra = d ? d.Ia().Oc : c.Va ? c.Dd ? (new E(c.Dd.getWidth(), c.Dd.getHeight())).round() : new E(0, 0) : kd(!0, H, a);
            b || (c.kg = H && H.outerWidth ? new E(H.outerWidth, H.outerHeight) : new E(-12245933, -12245933), c.dc = Re(c.Ra))
        },
        Pi = function() {
            var a = M.g();
            H.screen && (a.de = new E(H.screen.width, H.screen.height))
        },
        Qi = function(a) {
            if (!a.Le) {
                var b = H.document,
                    c = 0 <= We ? L() - We : -1,
                    d = L(); - 1 == a.Sa.Xg && (c = d);
                var e = M.g(),
                    f = vd(e.u),
                    g = Hi(a);
                try {
                    if (0 < g.length) {
                        var h = e.Ra;
                        h && (f.bs = [h.width, h.height]);
                        var k = e.kg;
                        k && (f.bos = [k.width, k.height]);
                        var m = e.dc;
                        m && (f.ps = [m.width, m.height]);
                        H.screen && (f.ss = [H.screen.width, H.screen.height])
                    } else f.url = encodeURIComponent(H.location.href.substring(0, 512)), b.referrer && (f.referrer = encodeURIComponent(b.referrer.substring(0, 512)));
                    f.tt = c;
                    f.pt = We;
                    switch (M.g().l) {
                        case "iem":
                            f.iem = 1;
                            break;
                        case "aio":
                            f.aio = 1;
                            break;
                        case "nio":
                            f.nio = 1
                    }
                    f.deb = [1, a.Sa.dl, a.Sa.zi, a.Sa.Uh, a.Sa.Oi, a.Sa.Xg, 0, a.Ya.hk].join("-");
                    f.tvt = Ki(a, d);
                    if (null !== H && H != H.top) {
                        0 <
                            g.length && (f.iframe_loc = encodeURIComponent(H.location.href.substring(0, 512)));
                        var n = kd(!1, H, a.$c);
                        f.is = [n.width, n.height]
                    }
                } catch (Z) {
                    f.error = 1
                }
                a.Le = f
            }
            a = a.Le;
            b = {};
            for (var t in a) b[t] = a[t];
            return b
        },
        Li = function(a, b) {
            var c = void 0 === c ? ya : c;
            var d = !1;
            A(b, function(b) {
                mg(b, a, "nio", c) && (d = !0)
            });
            return d
        },
        Ji = function(a) {
            if ("osd" == a.Im) {
                var b = a.cc,
                    c = Qi(a);
                A(b, function(a) {
                    var b = "uk";
                    a.fo && (b = "z");
                    a.io(c, "goog_update_data", b, fh.g())
                })
            }
        },
        Ri = function(a) {
            var b = R,
                c = [];
            A(a, function(a) {
                Ni(b, a.element) || (b.pa.push(a),
                    c.push(a))
            })
        },
        Si = function(a) {
            var b = R,
                c = [];
            A(a, function(a) {
                null == bb(b.pa, function(b) {
                    return b.element == a.element && b.ik == a.ik
                }) && (b.pa.push(a), c.push(a))
            })
        },
        Ki = function(a, b) {
            a = a.uk;
            Ze && (a += b - Ve);
            return a
        },
        Mi = function(a) {
            return Ya(Hi(a), function(a) {
                return a.ib
            })
        };
    za(Bi);
    var R = Bi.g();
    var Ti = function() {
        var a = Fb;
        return a ? Ya("AppleTV;GoogleTV;HbbTV;NetCast.TV;Opera TV;POV_TV;SMART-TV;SmartTV;TV Store;OMI/".split(";"), function(b) {
            return wb(a, b)
        }) ? !0 : wb(a, "Presto") && wb(a, "Linux") && !wb(a, "X11") && !wb(a, "Android") && !wb(a, "Mobi") : !1
    };
    var Ui = null,
        Vi = "",
        Wi = !1,
        Xi = function(a) {
            if (!a) return "";
            var b = [];
            b.push("url=" + encodeURIComponent(a.location.href.substring(0, 512)));
            a.document && a.document.referrer && b.push("referrer=" + encodeURIComponent(a.document.referrer.substring(0, 512)));
            return b.join("&")
        };
    var Yi = function(a) {
            return function(b) {
                return !u(b[a]) && u(0) ? 0 : b[a]
            }
        },
        $i = function() {
            var a = [0, 2, 4];
            return function(b) {
                b = b.tos;
                if (Ba(b)) {
                    for (var c = Array(b.length), d = 0; d < b.length; d++) c[d] = 0 < d ? c[d - 1] + b[d] : b[d];
                    return u(a) ? Zi(c, a) : c
                }
            }
        },
        aj = function(a, b) {
            return function(c) {
                c = c[a];
                if (Ba(c)) return Zi(c, b)
            }
        },
        cj = function(a) {
            var b = bj;
            return function(c) {
                return b(c) ? c[a] : void 0
            }
        },
        Zi = function(a, b) {
            return Va(a, function(a, d) {
                return 0 <= Ua(b, d)
            })
        };
    var bj = function(a, b) {
            return function(c) {
                for (var d = 0; d < b.length; d++)
                    if (b[d] === c[a] || !u(b[d]) && !c.hasOwnProperty(a)) return !0;
                return !1
            }
        }("e", [void 0, 1, 2, 3, 4, 8, 16]),
        dj = {
            sv: "sv",
            cb: "cb",
            e: "e",
            nas: "nas",
            msg: "msg",
            "if": "if",
            sdk: "sdk",
            p: "p",
            tos: "tos",
            mtos: "mtos",
            mcvt: "mcvt",
            ps: "ps",
            scs: "scs",
            bs: "bs",
            pt: "pt",
            vht: "vht",
            mut: "mut",
            a: "a",
            ft: "ft",
            dft: "dft",
            at: "at",
            dat: "dat",
            as: "as",
            vpt: "vpt",
            gmm: "gmm",
            std: "std",
            efpf: "efpf",
            swf: "swf",
            nio: "nio",
            px: "px",
            nnut: "nnut",
            vmer: "vmer",
            vmmk: "vmmk",
            vmiec: "vmiec",
            nmt: "nmt",
            tcm: "tcm",
            bt: "bt",
            pst: "pst",
            vpaid: "vpaid",
            dur: "dur",
            vmtime: "vmtime",
            dtos: "dtos",
            dtoss: "dtoss",
            dvs: "dvs",
            dfvs: "dfvs",
            dvpt: "dvpt",
            fmf: "fmf",
            vds: "vds",
            is: "is",
            i0: "i0",
            i1: "i1",
            i2: "i2",
            i3: "i3",
            ic: "ic",
            cs: "cs",
            c: "c",
            mc: "mc",
            nc: "nc",
            mv: "mv",
            nv: "nv",
            qmt: cj("qmtos"),
            qnc: cj("qnc"),
            qmv: cj("qmv"),
            qnv: cj("qnv"),
            raf: "raf",
            rafc: "rafc",
            lte: "lte",
            ces: "ces",
            tth: "tth",
            femt: "femt",
            femvt: "femvt",
            emc: "emc",
            emuc: "emuc",
            emb: "emb",
            avms: "avms",
            nvat: "nvat",
            qi: "qi",
            psm: "psm",
            psv: "psv",
            psfv: "psfv",
            psa: "psa",
            pnk: "pnk",
            pnc: "pnc",
            pnmm: "pnmm",
            pns: "pns",
            ptlt: "ptlt",
            dc_rfl: "urlsigs",
            pngs: "pings",
            obd: "obd",
            veid: "veid"
        },
        ej = {
            c: Yi("c"),
            at: "at",
            atos: aj("atos", [0, 2, 4]),
            ta: function(a, b) {
                return function(c) {
                    if (!u(c[a])) return b
                }
            }("tth", "1"),
            a: "a",
            dur: "dur",
            p: "p",
            tos: $i(),
            j: "dom",
            mtos: aj("mtos", [0, 2, 4]),
            gmm: "gmm",
            gdr: "gdr",
            ss: Yi("ss"),
            vsv: cd("w2"),
            t: "t"
        },
        fj = {
            atos: "atos",
            amtos: "amtos",
            avt: aj("atos", [2]),
            davs: "davs",
            dafvs: "dafvs",
            dav: "dav",
            ss: Yi("ss"),
            t: "t"
        },
        gj = {
            a: "a",
            tos: $i(),
            at: "at",
            c: Yi("c"),
            mtos: aj("mtos", [0, 2, 4]),
            dur: "dur",
            fs: "fs",
            p: "p",
            vpt: "vpt",
            vsv: cd("ias_w2"),
            dom: "dom",
            gmm: "gmm",
            gdr: "gdr",
            t: "t"
        },
        hj = {
            tos: $i(),
            at: "at",
            c: Yi("c"),
            mtos: aj("mtos", [0, 2, 4]),
            p: "p",
            vpt: "vpt",
            vsv: cd("dv_w4"),
            gmm: "gmm",
            gdr: "gdr",
            dom: "dom",
            t: "t",
            mv: "mv",
            qmpt: aj("qmtos", [0, 2, 4]),
            qvs: function(a, b) {
                return function(c) {
                    var d = c[a];
                    if (w(d)) return Wa(b, function(a) {
                        return 0 < d && d >= a ? 1 : 0
                    })
                }
            }("qnc", [1, .5, 0]),
            qmv: "qmv",
            qa: "qas",
            a: "a"
        };
    var jj = function(a, b) {
            var c = {
                sv: "651",
                cb: "j"
            };
            c.nas = R.pa.length;
            c.msg = a;
            u(b) && (a = ij(b)) && (c.e = Eg[a]);
            return c
        },
        ij = function(a) {
            var b = a.toLowerCase();
            return Nb(function(a) {
                return a == b
            })
        };
    var kj = function(a, b) {
        Pg.call(this, a, b)
    };
    q(kj, Pg);
    kj.prototype.lf = function(a) {
        return a.ua.qc()
    };
    var lj = function() {
        this.Pi = this.rj = this.Kj = this.Jj = this.gj = this.ue = ""
    };
    var mj = function() {},
        nj = function(a, b, c, d, e) {
            var f = {};
            if (u(a))
                if (null != b)
                    for (var g in b) {
                        var h = b[g];
                        g in Object.prototype || null != h && (x(h) ? f[g] = h(a) : f[g] = a[h])
                    } else Qb(f, a);
            u(c) && Qb(f, c);
            a = Of(Nf(new Mf, Sf(f)));
            0 < a.length && u(d) && u(e) && (e = e(a), a += "&" + d + "=" + e);
            return a
        };
    var oj = function() {};
    q(oj, mj);
    oj.prototype.ac = function(a) {
        var b = new lj;
        b.ue = nj(a, dj);
        b.gj = nj(a, fj);
        return b
    };
    var qj = function(a) {
        a = pj(a); of .call(this, a.length ? a[a.length - 1] : null);
        this.fe = a;
        this.Ed = []
    };
    q(qj, of );
    l = qj.prototype;
    l.Ga = function() {
        var a = {};
        A(this.Ed, function(b) {
            Qb(a, b.Ga())
        });
        return a
    };
    l.init = function() {
        var a = this;
        this.Ed = [];
        this.fe.length ? A(this.fe, function(b) {
            b.initialize() || a.Ed.push(b)
        }) : this.Ed = ["na"];
        return 0 == this.Ed.length
    };
    l.Ba = function() {
        A(this.fe, function(a) {
            a.Gf();
            a.Ba()
        }); of .prototype.Ba.call(this)
    };
    l.Cc = function() {
        return Ya(this.fe, function(a) {
            return a.Cc()
        })
    };
    l.sb = function() {
        return Ya(this.fe, function(a) {
            return a.sb()
        })
    };
    l.xd = function(a, b, c) {
        z(null != this.B);
        return new Bf(a, this.B, b, c)
    };
    var pj = function(a) {
        if (!a.length) return [];
        a = Va(a, function(a) {
            return null != a && a.Cc()
        });
        for (var b = 1; b < a.length; b++) gf(a[b - 1], a[b]);
        return a
    };
    var rj = {
            threshold: [0, .25, .5, .75, 1]
        },
        sj = function(a, b, c, d) {
            nf.call(this, a, b, c, d);
            this.Ah = this.Fg = this.vc = null;
            this.tg = 0;
            this.Wf = null
        };
    q(sj, nf);
    sj.prototype.getName = function() {
        return "nio"
    };
    sj.prototype.observe = function() {
        var a = this;
        this.Ah || (this.Ah = L());
        if (Be(298, function() {
                return tj(a)
            })) return !0;
        ff(this.B, "msf");
        return !1
    };
    sj.prototype.unobserve = function() {
        if (this.vc && this.element) try {
            this.vc.unobserve(this.element)
        } catch (a) {}
    };
    var tj = function(a) {
            if (!a.element) return !1;
            var b = a.element;
            a.vc = new(a.B.Ve().IntersectionObserver)(function(b) {
                try {
                    uj(a, b)
                } catch (d) {
                    a.unobserve(), De(299, d)
                }
            }, rj);
            a.vc.observe(b);
            vj(b);
            return !0
        },
        wj = function(a) {
            var b = a.boundingClientRect.width * a.boundingClientRect.height;
            a = a.intersectionRect.width * a.intersectionRect.height;
            return b ? a / b : 0
        },
        xj = function(a, b) {
            var c = 0;
            b = b.intersectionRect.width * b.intersectionRect.height;
            (a = a.B.Ia().Pa) && (c = (a.bottom - a.top) * (a.right - a.left));
            return c ? b / c : 0
        },
        uj = function(a,
            b) {
            if (b.length) {
                a.Fg || (a.Fg = L());
                var c = 2 === K(M.g().u, "nio_mode");
                c && null !== a.Wf && (clearTimeout(a.Wf), a.Wf = null);
                b = yj(b);
                var d = Oe(b.boundingClientRect),
                    e = Oe(b.intersectionRect).translate(-d.left, -d.top),
                    f = wj(b),
                    g = xj(a, b);
                if (c) {
                    if (a.eb = new Te(a.B.Ia(), a.element, d, e, f, g, b.time), 0 < f && (a.Wf = setTimeout(function() {
                            var b = a.element;
                            b && a.vc && (a.vc.unobserve(b), a.vc.observe(b))
                        }, 2E3)), 2 > a.tg) {
                        a.tg += 1;
                        try {
                            var h = new Mf;
                            Nf(h, zj(a, b));
                            Vf(h)
                        } catch (k) {}
                    }
                } else a.eb = new Te(a.B.Ia(), a.element, d, e, f, g)
            }
        },
        zj = function(a,
            b) {
            var c = a.element.getBoundingClientRect();
            a = kf(a.B).Hd;
            var d = Math.min(c.left, 0),
                e = Math.min(c.top, 0),
                f = c.left - d,
                g = c.top - e,
                h = {};
            return h.id = "av-js", h.type = "iobs-geom", h.iobsRectX = b.boundingClientRect.left, h.iobsRectY = b.boundingClientRect.top, h.iobsRectWidth = b.boundingClientRect.width, h.iobsRectHeight = b.boundingClientRect.height, h.geoRectX = c.left, h.geoRectY = c.top, h.geoRectWidth = c.width, h.geoRectHeight = c.height, h.iobsInterRectX = b.intersectionRect.left, h.iobsInterRectY = b.intersectionRect.top, h.iobsInterRectWidth =
                b.intersectionRect.width, h.iobsInterRectHeight = b.intersectionRect.height, h.geoInterRectWidth = Math.max(0, Math.min(a.width - f, c.width + d)), h.geoInterRectHeight = Math.max(0, Math.min(a.height - g, c.height + e)), h.geoInterRectX = f, h.geoInterRectY = g, h
        },
        yj = function(a) {
            return Xa(a, function(a, c) {
                return a.time > c.time ? a : c
            }, a[0])
        },
        vj = function(a) {
            if (a = a.style) {
                var b = a.opacity;
                a.opacity = .98;
                a.opacity = .99;
                a.opacity = b
            }
        };
    sj.prototype.Ga = function() {
        var a = {};
        return Object.assign(this.B.Ga(), (a.niot_obs = this.Ah, a.niot_cbk = this.Fg, a))
    };
    var Aj = function(a) { of .call(this, new N(a, "nio", 2))
    };
    q(Aj, of );
    Aj.prototype.Cc = function() {
        var a = K(M.g().u, "nio_mode"),
            b = 2 === a;
        a = 1 === a;
        var c = M.g().jb;
        return (b || a && c) && this.sb()
    };
    Aj.prototype.sb = function() {
        return "exc" !== M.g().l && 1 != K(M.g().u, "inapp") && null != this.B.Ve().IntersectionObserver
    };
    Aj.prototype.xd = function(a, b, c) {
        return new sj(a, this.B, b, c)
    };
    var Bj = function() {
        N.call(this, H, "na", 1);
        this.Qc = new xd(0, "");
        this.Nj = 4;
        this.kb = [];
        this.Gm = [];
        this.pg = 0;
        this.Mj = !1;
        this.ak = this.Qh = 0;
        this.yi = "";
        this.Fd = [];
        this.Fi = !0
    };
    q(Bj, N);
    Bj.prototype.Ga = function() {
        var a = {};
        return a.exg = 1, a
    };
    var Cj = function(a) {
        var b = 0;
        a = a.ca;
        try {
            if (a && a.Goog_AdSense_getAdAdapterInstance) return a
        } catch (c) {}
        for (; a && 5 > b;) {
            try {
                if (a.google_osd_static_frame) return a.google_osd_static_frame
            } catch (c) {}
            try {
                if (a.aswift_0 && a.aswift_0.google_osd_static_frame) return a.aswift_0.google_osd_static_frame
            } catch (c) {}
            b++;
            a = a != a.parent ? a.parent : null
        }
        return null
    };
    Bj.prototype.initialize = function() {
        var a = this;
        if (this.Zc) return !this.wf;
        this.Zc = !0;
        if (!yd(this.Qc)) return ff(this, "ib"), !1;
        Fe(r, "message", function(b) {
            if (null != b && b.data && v(b.data)) {
                var c = b.data;
                if (v(c)) {
                    var e = {};
                    c = c.split("\n");
                    for (var f = 0; f != c.length; ++f) {
                        var g = c[f],
                            h = g.indexOf("=");
                        if (!(0 >= h)) {
                            var k = Number(g.substr(0, h));
                            g = g.substr(h + 1);
                            switch (k) {
                                case 26:
                                case 15:
                                case 8:
                                case 11:
                                case 16:
                                case 5:
                                case 18:
                                    g = "true" == g;
                                    break;
                                case 4:
                                case 33:
                                case 6:
                                case 25:
                                case 28:
                                case 29:
                                case 24:
                                case 23:
                                case 22:
                                case 7:
                                case 21:
                                case 20:
                                    g =
                                        Number(g);
                                    break;
                                case 19:
                                case 3:
                                    if (x(decodeURIComponent)) try {
                                        g = decodeURIComponent(g)
                                    } catch (n) {
                                        throw Error("Error: URI malformed: " + g);
                                    }
                            }
                            e[k] = g
                        }
                    }
                    e = e[0] ? e : null
                } else e = null;
                if (e && a.Qc.matches(new xd(e[4], e[12])) && (c = e[29], f = e[0], 0 <= Ua(["goog_acknowledge_monitoring", "goog_get_mode", "goog_update_data", "goog_image_request"], f))) {
                    Dj(a, e);
                    if ("goog_get_mode" == f && b.source) {
                        k = {};
                        Ge(a.Qc, k);
                        k[0] = "goog_provide_mode";
                        k[6] = a.Nj;
                        k[19] = a.yi;
                        k[16] = a.Mj;
                        try {
                            var m = He(k);
                            b.source.postMessage(m, b.origin);
                            Ej(a, m)
                        } catch (n) {
                            De(406,
                                n)
                        }
                    }
                    if ("goog_get_mode" == f || "goog_acknowledge_monitoring" == f) Fj(a, e[28]), a.pg = 2, Gj(a);
                    if (b = e[32]) a.name = b;
                    if (a.kb.length || a.Rb.length)
                        if (4 != c && (c = !1, b = a.ub.Oc, m = a.ub.Pa, "goog_acknowledge_monitoring" == e[0] && (e[8] ? a.fc = 0 : (a.fc = 2, a.Ld = 2, a.Ea = a), ef(a)), isNaN(e[30]) || isNaN(e[31]) ? isNaN(e[22]) || isNaN(e[23]) || (c = !0, b = new E(e[22], e[23])) : (c = !0, b = new E(e[30], e[31])), e[9] && (c = !0, f = e[9].split("-"), 4 == f.length && (m = new G(Bb(f[0]), Bb(f[3]), Bb(f[2]), Bb(f[1])))), c && (c = kf(a), c.Oc = b, c.Pa = m, c.bi = R.P(), lf(a, c))), b = e[0],
                            m = 100 * e[25], w(m) && !isNaN(m) && Hj(a, m), void 0 != e[18] && Ij(a, e[18]), void 0 != e[7] && 0 < e[7] && Jj(a, e[7]), m = !!e[5], c = !!e[11], f = !1, "goog_update_data" == b && (f = !!e[15], Kj(a, e[3])), k = !c && "goog_update_data" == b && !e[18], void 0 != e[34]) a.Fd = e[34].split(","), ff(a, "msf");
                        else switch (b) {
                            case "goog_image_request":
                                Lj(a, m, c);
                            case "goog_update_data":
                                k && Mj(a), m && Nj(a, f), c && Oj(a)
                        }
                }
            }
        }, 118);
        var b = Ce(197, function() {
            var b = a.Nj,
                d = a.Qc,
                e = a.Mj,
                f = a.yi;
            e = void 0 === e ? !1 : e;
            f = void 0 === f ? "" : f;
            ++a.ak;
            if (2 == a.pg) Gj(a);
            else if (10 < a.ak) ff(a,
                "no");
            else if (a.ca.postMessage)
                if (yd(d)) {
                    var g = Cj(a);
                    if (g) {
                        e = void 0 === e ? !1 : e;
                        f = void 0 === f ? "" : f;
                        var h = {};
                        Ge(d, h);
                        h[0] = "goog_request_monitoring";
                        h[6] = b;
                        h[27] = a.ca.document.domain;
                        h[16] = e;
                        f && f.length && (h[19] = f);
                        try {
                            var k = He(h);
                            g.postMessage(k, "*")
                        } catch (m) {}
                    }
                } else ff(a, "ib");
            else ff(a, "c")
        });
        this.pg = 1;
        this.Qh = this.ca.setInterval(b, 500);
        return !0
    };
    Bj.prototype.Gf = function() {
        var a = {};
        Ge(this.Qc, a);
        a[0] = "goog_stop_monitoring";
        Ej(this, He(a));
        Gj(this)
    };
    var Gj = function(a) {
            a.ca.clearInterval(a.Qh);
            a.Qh = 0
        },
        Ej = function(a, b) {
            var c = Cj(a),
                d = !c;
            d && (c = a.ca.parent);
            if (c && c.postMessage) try {
                c.postMessage(b, "*"), d && a.ca.postMessage(b, "*")
            } catch (e) {}
        },
        Fj = function(a, b) {
            A(a.kb, function(a) {
                a.Zn(b)
            })
        },
        Kj = function(a, b) {
            A(a.kb, function(a) {
                a.Yn(b)
            })
        },
        Hj = function(a, b) {
            A(a.kb, function(a) {
                a.Xn(b)
            })
        },
        Ij = function(a, b) {
            A(a.kb, function(a) {
                a.co(b)
            })
        },
        Jj = function(a, b) {
            A(a.kb, function(a) {
                a.Wn(b)
            })
        },
        Lj = function(a, b, c) {
            A(a.kb, function(a) {
                a.$n(b, c)
            })
        },
        Mj = function(a) {
            A(a.kb, function(a) {
                a.Vn()
            })
        },
        Nj = function(a, b) {
            A(a.kb, function(a) {
                a.bo(b)
            })
        },
        Oj = function(a) {
            A(a.kb, function(a) {
                a.ao()
            })
        },
        Dj = function(a, b) {
            A(a.Gm, function(a) {
                a(b)
            })
        };
    Bj.prototype.Cc = function() {
        var a = M.g();
        return K(a.u, "osd") && this.sb() ? 4 === a.Hi ? !!K(a.u, "mkm") : !0 : !1
    };
    Bj.prototype.sb = function() {
        return M.g().jb
    };
    za(Bj);
    var S = function() {
        this.df = this.Zc = !1;
        this.te = null;
        this.xc = new oj;
        this.gb = null;
        var a = {};
        this.Rl = (a.start = this.Pl, a.firstquartile = this.Kl, a.midpoint = this.Ml, a.thirdquartile = this.Ql, a.complete = this.Il, a.pause = this.Fh, a.resume = this.ek, a.skip = this.Ol, a.viewable_impression = this.Lb, a.mute = this.od, a.unmute = this.od, a.fullscreen = this.Ll, a.exitfullscreen = this.Jl, a.fully_viewable_audible_half_duration_impression = this.Lb, a.measurable_impression = this.Lb, a.abandon = this.Fh, a.engagedview = this.Lb, a.impression = this.Lb,
            a.creativeview = this.Lb, a.progress = this.od, a.custom_metric_viewable = this.Lb, a.bufferstart = this.Fh, a.bufferfinish = this.ek, a);
        a = {};
        this.Hm = (a.overlay_resize = this.Nl, a.abandon = this.Pg, a.close = this.Pg, a.collapse = this.Pg, a.overlay_unmeasurable_impression = function(a) {
            return dh(a, "overlay_unmeasurable_impression", R.P())
        }, a.overlay_viewable_immediate_impression = function(a) {
            return dh(a, "overlay_viewable_immediate_impression", R.P())
        }, a.overlay_unviewable_impression = function(a) {
            return dh(a, "overlay_unviewable_impression",
                R.P())
        }, a.overlay_viewable_end_of_session_impression = function(a) {
            return dh(a, "overlay_viewable_end_of_session_impression", R.P())
        }, a);
        M.g().Hi = 3
    };
    S.prototype.Oe = function(a) {
        a.ib = !1;
        Pj(a.Ha(), a.va)
    };
    S.prototype.Kg = function() {};
    var Qj = function(a, b, c, d) {
        b = a.zf(null, d, !0, b);
        b.ob = c;
        b.ph = function(b) {
            a.Og(b)
        };
        Ri([b]);
        return b
    };
    S.prototype.zf = function(a, b, c, d) {
        this.gb || (this.gb = this.Li());
        b = c ? b : -1;
        if (null == this.gb || this.df) return a = new Ug(H, a, b, 7), a.va = d, a;
        a = new Ug(H, a, b, 7, new Pg("measurable_impression", this.gb), this.Lg());
        a.va = d;
        return a
    };
    S.prototype.Lg = function() {
        return [new kj("viewable_impression", this.gb)]
    };
    var Rj = function() {
            var a = [],
                b = M.g();
            K(b.u, "osd") && b.jb && b.Va && "exc" != b.l && (M.g().Va = !1, a.push(Bj.g()));
            return [new Aj(H), new qj(a)]
        },
        Tj = function(a) {
            if (!a.Zc) {
                a.Zc = !0;
                try {
                    var b = L(),
                        c = M.g();
                    We = b;
                    Ui = pg(H).ca;
                    Fi(R, !1);
                    Pi();
                    if ("nis" != c.l && "gsv" != c.l)
                        if (H.document.body && H.document.body.getBoundingClientRect) {
                            R.Sa.zi = 0;
                            R.Sa.Xg = L() - b;
                            var d = Rj(),
                                e = fh.g();
                            e.Gi = d;
                            if (gh(e, function() {
                                    c.Va = !1;
                                    Sj()
                                })) R.done || (Ei(), gf(e.wa.B, a));
                            else if ("na" == c.l && (c.l = "geo"), c.jb && "exc" != c.l) {
                                var f = !!K(c.u, "osd");
                                if (c.Va && !f) {
                                    var g =
                                        Bj.g();
                                    g.initialize();
                                    gf(g, a)
                                } else Sj()
                            } else Ei()
                        } else Wi = !0
                } catch (h) {
                    throw R.reset(), h;
                }
            }
        },
        Uj = function(a) {
            var b = M.g();
            if (null == a.te) switch (b.l) {
                case "nis":
                    a.te = "n";
                    break;
                case "gsv":
                    a.te = "m";
                    break;
                default:
                    a.te = "h"
            }
            return a.te
        },
        Vj = function(a, b, c) {
            if (null == a.gb) return b.pd |= 4, !1;
            a = a.gb.Oa(c, b);
            b.pd |= a;
            return 0 == a
        };
    S.prototype.Xc = function(a) {
        var b = M.g();
        switch (a.Mb()) {
            case 0:
                b.Va = !1;
                (a = fh.g().wa) && jf(a.B, this);
                (a = Bj.g()) && jf(a, this);
                Sj();
                break;
            case 2:
                b.Va && Ei()
        }
    };
    S.prototype.lc = function(a) {
        var b = M.g();
        b.Va && (b.Ra = a.Oc, b.Dd = a.Pa)
    };
    S.prototype.Vb = function() {
        return !1
    };
    var Sj = function() {
        a: {
            var a = R;
            if (void 0 === b) {
                var b = M.g().u;
                var c = [];
                0 === (K(b, "nio_mode") || 0) && c.push(a.Zm);
                c.push(a.Ym);
                b = c
            }
            b = p(b);
            for (c = b.next(); !c.done; c = b.next())
                if (c.value.call(a, H)) {
                    a = !0;
                    break a
                }
            a = !1
        }
        a ? Ei() : (R.Ya.cancel(), Vi = "i", R.done = !0)
    };
    S.prototype.Hl = function(a, b) {
        a.bd = !0;
        switch (a.Ha()) {
            case 1:
                Wj(this, a, b);
                break;
            case 2:
                this.Ph(a)
        }
        this.Vh(a)
    };
    var Wj = function(a, b, c) {
        if (!b.zk) {
            var d = dh(b, "start", R.P());
            a = a.xc.ac(d).ue;
            d = Ui || H;
            var e = [];
            e.push("v=651v");
            e.push("r=" + c);
            e.push(a);
            e.push(Xi(d));
            Uf("//pagead2.googlesyndication.com/pagead/gen_204?id=lidarvf&" + e.join("&"));
            b.zk = !0
        }
    };
    l = S.prototype;
    l.Pl = function(a) {
        ch(a, 0);
        return dh(a, "start", R.P())
    };
    l.od = function(a, b, c) {
        Gi(R, [a], !R.P(), b);
        return this.Lb(a, b, c)
    };
    l.Lb = function(a, b, c) {
        return dh(a, c, R.P())
    };
    l.Kl = function(a, b) {
        return Xj(a, "firstquartile", 1, b)
    };
    l.Ml = function(a, b) {
        a.pi = !0;
        return Xj(a, "midpoint", 2, b)
    };
    l.Ql = function(a, b) {
        return Xj(a, "thirdquartile", 3, b)
    };
    l.Il = function(a, b) {
        b = Xj(a, "complete", 4, b);
        0 != a.V && (a.V = 3);
        return b
    };
    var Xj = function(a, b, c, d) {
        Gi(R, [a], !R.P(), d);
        ch(a, c);
        4 != c && bh(a.hd, c, a.Te);
        return dh(a, b, R.P())
    };
    l = S.prototype;
    l.ek = function(a, b, c) {
        var d = R.P();
        if (2 == a.V && !d) {
            var e = L();
            a.ua.ie = e
        }
        Gi(R, [a], !d, b);
        2 == a.V && (a.V = 1);
        return dh(a, c, d)
    };
    l.Ol = function(a, b) {
        b = this.od(a, b || {}, "skip");
        0 != a.V && (a.V = 3);
        return b
    };
    l.Ll = function(a, b) {
        a.ib = !0;
        return this.od(a, b || {}, "fullscreen")
    };
    l.Jl = function(a, b) {
        a.ib = !1;
        return this.od(a, b || {}, "exitfullscreen")
    };
    l.Fh = function(a, b, c) {
        var d = a.ua,
            e = L();
        d.oi = Ng(d, e, 1 != a.V);
        Gi(R, [a], !R.P(), b);
        1 == a.V && (a.V = 2);
        return dh(a, c, R.P())
    };
    l.Nl = function(a, b) {
        Gi(R, [a], !R.P(), b);
        return a.Gl()
    };
    l.Pg = function(a, b) {
        Gi(R, [a], !R.P(), b);
        this.Xj(a);
        0 != a.V && (a.V = 3);
        return a.Gl()
    };
    var Yj = function(a, b, c) {
            if (0 == b.V) {
                "i" != Vi && (R.done = !1);
                var d = fh.g();
                null != d.wa && (d = z(d.wa), dg(b, d));
                mg(b, H, M.g().l, function(b) {
                    for (var c = [], d = 0; d < arguments.length; ++d) c[d - 0] = arguments[d];
                    return a.Hl.apply(a, oa(c))
                });
                d = u(c) ? c.opt_nativeTime : void 0;
                Ye = d = w(d) ? d : L();
                b.gc = !0;
                var e = R.P();
                Vg(b, d, e);
                Gi(R, [b], !e, c)
            }
        },
        Pj = function(a, b) {
            if (v(b)) {
                if (1 == a) var c = R.pa;
                else if (2 == a) c = R.cc;
                else return;
                var d = ab(c, function(c) {
                    return c.Ha() != a ? !1 : z(c).va == b
                });
                0 <= d && (hg(c[d]), db(c, d))
            }
        },
        lk = function(a, b, c, d) {
            var e = bb(R.pa,
                function(a) {
                    return a.element == c
                });
            null !== e && e.va != b && (a.Oe(e), e = null);
            e || (e = Zj(a, c, b), e.ob = Uj(a), d && (e.Sb = d));
            return e
        },
        Zj = function(a, b, c) {
            b = a.zf(b, L(), !1, c);
            b.ph = y(a.Og, a);
            0 == R.cc.length && (M.g().Jh = 79463069);
            Si([b]);
            Ei();
            return b
        };
    S.prototype.Og = function() {};
    S.prototype.cj = function(a, b) {
        var c = Nb(function(b) {
                return b == a
            }),
            d = {};
        c = (d.sv = "651", d.cb = "j", d.e = Eg[c], d);
        d = dh(b, a, R.P());
        Qb(c, d);
        b.si[a] = d;
        return 2 == b.Ha() ? Tf(c).join("&") : this.xc.ac(c).ue
    };
    S.prototype.Ue = function(a, b) {
        if (Wi) return jj("ue");
        a = this.Kg(a, b);
        if (!a) return jj("nf");
        b = jj();
        Qb(b, a.Ue(!0, !1, !1));
        return b
    };
    var nk = function(a, b) {
        b.qe = 0;
        for (var c in Ag) null == a[c] && (b.qe |= Ag[c]);
        mk(a, "currentTime");
        mk(a, "duration")
    };
    l = S.prototype;
    l.Ph = function() {};
    l.Xj = function() {};
    l.yb = function() {};
    l.Vh = function() {};
    l.Li = function() {};
    var mk = function(a, b) {
        var c = a[b];
        u(c) && (a[b] = Math.floor(1E3 * c))
    };
    var ok = {
            vn: "visible",
            nn: "audible",
            On: "time",
            Pn: "timetype"
        },
        pk = {
            visible: function(a) {
                return /^(100|[0-9]{1,2})$/.test(a)
            },
            audible: function(a) {
                return "0" == a || "1" == a
            },
            timetype: function(a) {
                return "mtos" == a || "tos" == a
            },
            time: function(a) {
                return /^(100|[0-9]{1,2})%$/.test(a) || /^([0-9])+ms$/.test(a)
            }
        },
        qk = function() {
            this.Ac = void 0;
            this.ae = !1;
            this.Df = 0;
            this.Sh = -1;
            this.di = "tos"
        },
        rk = function(a) {
            try {
                var b = a.split(",");
                return b.length > Lb(ok).length ? null : Xa(b, function(a, b) {
                    b = b.toLowerCase().split("=");
                    if (2 != b.length ||
                        !u(pk[b[0]]) || !pk[b[0]](b[1])) throw Error("Entry (" + b[0] + ", " + b[1] + ") is invalid.");
                    a[b[0]] = b[1];
                    return a
                }, {})
            } catch (c) {
                return null
            }
        };
    qk.prototype.setTime = function(a, b, c) {
        "ms" == b ? (this.Df = a, this.Sh = -1) : (this.Df = -1, this.Sh = a);
        this.di = void 0 === c ? "tos" : c;
        return this
    };
    var sk = function(a, b) {
        if (void 0 == a.Ac) return 0;
        switch (a.di) {
            case "mtos":
                return a.ae ? xf(b.qb, a.Ac) : xf(b.$a, a.Ac);
            case "tos":
                return a.ae ? wf(b.qb, a.Ac) : wf(b.$a, a.Ac)
        }
        return 0
    };
    var tk = function(a, b, c, d) {
        Pg.call(this, b, d);
        this.oc = a;
        this.ul = c
    };
    q(tk, Pg);
    tk.prototype.Vc = function() {
        return this.oc
    };
    tk.prototype.bf = function() {
        return !0
    };
    tk.prototype.lf = function(a) {
        var b = a.ua,
            c = a.getDuration();
        return Ya(this.ul, function(a) {
            if (void 0 != a.Ac) var d = sk(a, b);
            else b: {
                switch (a.di) {
                    case "mtos":
                        d = a.ae ? b.Nc.Ua() : b.Eb.la();
                        break b;
                    case "tos":
                        d = a.ae ? b.Nc.la() : b.Eb.la();
                        break b
                }
                d = 0
            }
            0 == d ? a = !1 : (a = -1 != a.Df ? a.Df : u(c) && 0 < c ? a.Sh * c : -1, a = -1 != a && d >= a);
            return a
        })
    };
    var uk = function(a) {
        Pg.call(this, "fully_viewable_audible_half_duration_impression", a)
    };
    q(uk, Pg);
    uk.prototype.lf = function(a) {
        var b = wf(a.ua.qb, 1);
        return Xg(a, b)
    };
    var vk = Ha(),
        wk = !1,
        xk = !1,
        yk = !1,
        T = function(a) {
            return !a || "function" !== typeof a || 0 > String(Function.prototype.toString).indexOf("[native code]") ? !1 : 0 <= String(a).indexOf("[native code]") && !0 || !1
        },
        U = function(a) {
            return !!(1 << a & vk)
        },
        zk = [function(a) {
                return !(!a.chrome || !a.chrome.webstore)
            }, function(a) {
                return !!a.document.documentMode
            }, function(a) {
                return !!a.document.fonts.ready
            }, function() {
                return U(0)
            }, function(a) {
                return !!a.ActiveXObject
            }, function(a) {
                return !!a.chrome
            }, function(a) {
                return !!a.navigator.serviceWorker
            },
            function(a) {
                return !!a.opera
            },
            function(a) {
                return !!a.sidebar
            },
            function() {
                return !+"\v1"
            },
            function() {
                return U(1)
            },
            function(a) {
                return !a.ActiveXObject
            },
            function(a) {
                return "-ms-ime-align" in a.document.documentElement.style
            },
            function(a) {
                return "-ms-scroll-limit" in a.document.documentElement.style
            },
            function(a) {
                return "-webkit-font-feature-settings" in a.document.body.style
            },
            function() {
                return U(2)
            },
            function(a) {
                return "ActiveXObject" in a
            },
            function(a) {
                return "MozAppearance" in a.document.documentElement.style
            },
            function(a) {
                return "_phantom" in
                    a
            },
            function(a) {
                return "callPhantom" in a
            },
            function(a) {
                return "content" in a.document.createElement("template")
            },
            function(a) {
                return "getEntriesByType" in a.performance
            },
            function() {
                return U(3)
            },
            function(a) {
                return "image-rendering" in a.document.body.style
            },
            function(a) {
                return "object-fit" in a.document.body.style
            },
            function(a) {
                return "open" in a.document.createElement("details")
            },
            function(a) {
                return "orientation" in a.screen
            },
            function(a) {
                return "performance" in a
            },
            function(a) {
                return "shape-image-threshold" in a.document.body.style
            },
            function() {
                return U(4)
            },
            function(a) {
                return "srcset" in a.document.createElement("img")
            },
            function() {
                return xk
            },
            function() {
                return yk
            },
            function() {
                return U(5)
            },
            function(a) {
                a = a.document.createElement("div");
                a.style.width = "1px";
                a.style.width = "-webkit-min-content";
                a.style.width = "min-content";
                return "1px" != a.style.width
            },
            function(a) {
                a = a.document.createElement("div");
                a.style.width = "1px";
                a.style.width = "calc(1px - 1px)";
                a.style.width = "-webkit-calc(1px - 1px)";
                return "1px" != a.style.width
            },
            function() {
                var a = !1;
                eval('var DummyFunction1 = function(x){ "use strict"; var a = 12; b = a + x*35; }');
                try {
                    DummyFunction1()
                } catch (b) {
                    a = !0
                }
                return a
            },
            function() {
                var a = !1;
                try {
                    DummyFunction2()
                } catch (b) {
                    a = !0
                }
                return a
            },
            function() {
                return !1
            },
            function() {
                return U(6)
            },
            function(a) {
                var b = a.document.createElement("canvas");
                b.width = b.height = 1;
                b = b.getContext("2d");
                b.globalCompositeOperation = "multiply";
                b.fillStyle = "rgb(0,255,255)";
                b.fillRect(0, 0, 1, 1);
                b.fill();
                b.fillStyle = "rgb(255,255,0)";
                b.fillRect(0, 0, 1, 1);
                b.fill();
                b = b.getImageData(0, 0, 1, 1).data;
                return b[0] == b[2] && b[1] == b[3] || T(a.navigator.vibrate)
            },
            function(a) {
                a =
                    a.document.createElement("canvas");
                a.width = a.height = 1;
                a = a.getContext("2d");
                a.globalCompositeOperation = "multiply";
                a.fillStyle = "rgb(0,255,255)";
                a.fillRect(0, 0, 1, 1);
                a.fill();
                a.fillStyle = "rgb(255,255,0)";
                a.fillRect(0, 0, 1, 1);
                a.fill();
                a = a.getImageData(0, 0, 1, 1).data;
                return a[0] == a[2] && a[1] == a[3]
            },
            function(a) {
                return T(a.document.createElement("div").matches)
            },
            function(a) {
                a = a.document.createElement("input");
                a.setAttribute("type", "range");
                return "text" !== a.type
            },
            function(a) {
                return a.CSS.supports("image-rendering",
                    "pixelated")
            },
            function(a) {
                return a.CSS.supports("object-fit", "contain")
            },
            function() {
                return U(7)
            },
            function(a) {
                return a.CSS.supports("object-fit", "inherit")
            },
            function(a) {
                return a.CSS.supports("shape-image-threshold", "0.9")
            },
            function(a) {
                return a.CSS.supports("word-break", "keep-all")
            },
            function() {
                return eval("1 == [for (item of [1,2,3]) item][0]")
            },
            function(a) {
                return T(a.CSS.supports)
            },
            function() {
                return T(Intl.Collator)
            },
            function(a) {
                return T(a.document.createElement("dialog").show)
            },
            function() {
                return U(8)
            },
            function(a) {
                return T(a.document.createElement("div").animate([{
                    transform: "scale(1)",
                    xl: "ease-in"
                }, {
                    transform: "scale(1.3)",
                    xl: "ease-in"
                }], {
                    duration: 1300,
                    ho: 1
                }).reverse)
            },
            function(a) {
                return T(a.document.createElement("div").animate)
            },
            function(a) {
                return T(a.document.documentElement.webkitRequestFullScreen)
            },
            function(a) {
                return T(a.navigator.getBattery)
            },
            function(a) {
                return T(a.navigator.permissions.query)
            },
            function() {
                return !1
            },
            function() {
                return U(9)
            },
            function() {
                return T(webkitRequestAnimationFrame)
            },
            function(a) {
                return T(a.BroadcastChannel.call)
            },
            function(a) {
                return T(a.FontFace)
            },
            function(a) {
                return T(a.Gamepad)
            },
            function() {
                return U(10)
            },
            function(a) {
                return T(a.MutationEvent)
            },
            function(a) {
                return T(a.MutationObserver)
            },
            function(a) {
                return T(a.crypto.getRandomValues)
            },
            function(a) {
                return T(a.document.body.createShadowRoot)
            },
            function(a) {
                return T(a.document.body.webkitCreateShadowRoot)
            },
            function(a) {
                return T(a.fetch)
            },
            function() {
                return U(11)
            },
            function(a) {
                return T(a.navigator.serviceWorker.register)
            },
            function(a) {
                return T(a.navigator.webkitGetGamepads)
            },
            function(a) {
                return T(a.speechSynthesis.speak)
            },
            function(a) {
                return T(a.webkitRTCPeerConnection)
            },
            function(a) {
                return a.CSS.supports("--fake-var", "0")
            },
            function() {
                return U(12)
            },
            function(a) {
                return a.CSS.supports("cursor", "grab")
            },
            function(a) {
                return a.CSS.supports("cursor", "zoom-in")
            },
            function(a) {
                return a.CSS.supports("image-orientation", "270deg")
            },
            function() {
                return U(13)
            },
            function(a) {
                return a.CSS.supports("position", "sticky")
            },
            function(a) {
                return void 0 === a.document.createElement("style").scoped
            },
            function(a) {
                return a.performance.getEntriesByType("resource") instanceof
                Array
            },
            function() {
                return "undefined" == typeof InstallTrigger
            },
            function() {
                return "object" == typeof(new Intl.Collator).resolvedOptions()
            },
            function(a) {
                return "boolean" == typeof a.navigator.onLine
            },
            function() {
                return U(14)
            },
            function(a) {
                return "undefined" == typeof a.navigator.no
            },
            function(a) {
                return "number" == typeof a.performance.now()
            },
            function() {
                return 0 == (new Uint16Array(1))[0]
            },
            function(a) {
                return -1 == a.ActiveXObject.toString().indexOf("native")
            },
            function(a) {
                return -1 == Object.prototype.toString.call(a.HTMLElement).indexOf("Constructor")
            }
        ],
        Ak = [function(a) {
            a = a.document.createElement("div");
            var b = null,
                c = ["{45EA75A0-A269-11D1-B5BF-0000F8051515}", "{3AF36230-A269-11D1-B5BF-0000F8051515}", "{89820200-ECBD-11CF-8B85-00AA005B4383}"];
            try {
                a.style.behavior = "url(#default#clientcaps)"
            } catch (e) {}
            for (var d = 0; d < c.length; d++) {
                try {
                    b = a.getComponentVersion(c[d], "componentid").replace(/,/g, ".")
                } catch (e) {}
                if (b) return b.split(".")[0]
            }
            return !1
        }, function() {
            return (new Date).getTimezoneOffset()
        }, function(a) {
            return (a.innerWidth || a.document.documentElement.clientWidth ||
                a.document.body.clientWidth) / (a.innerHeight || a.document.documentElement.clientHeight || a.document.body.clientHeight)
        }, function(a) {
            return (a.outerWidth || a.document && a.document.body && a.document.body.offsetWidth) / (a.outerHeight || a.document && a.document.body && a.document.body.offsetHeight)
        }, function(a) {
            return a.screen.availWidth / a.screen.availHeight
        }, function(a) {
            return a.screen.width / a.screen.height
        }],
        Bk = [function(a) {
            return a.navigator.userAgent
        }, function(a) {
            return a.navigator.platform
        }, function(a) {
            return a.navigator.vendor
        }],
        Dk = function() {
            try {
                Ck()
            } catch (d) {}
            var a = "a=1&b=" + vk + "&",
                b = [],
                c = 99;
            A(zk, function(a, c) {
                var d = !1;
                try {
                    d = a(H)
                } catch (g) {}
                b[c / 32 >>> 0] |= d << c % 32
            });
            A(b, function(b, e) {
                a += String.fromCharCode(c + e) + "=" + (b >>> 0).toString(16) + "&"
            });
            c = 105;
            A(Ak, function(b) {
                var d = "false";
                try {
                    d = b(H)
                } catch (f) {}
                a += String.fromCharCode(c++) + "=" + d + "&"
            });
            A(Bk, function(b) {
                var d = "";
                try {
                    var f = b(H);
                    b = [];
                    for (var g = 0, h = 0; h < f.length; h++) {
                        var k = f.charCodeAt(h);
                        255 < k && (b[g++] = k & 255, k >>= 8);
                        b[g++] = k
                    }
                    z(Ca(b), "encodeByteArray takes an array as a parameter");
                    if (!Bd)
                        for (Bd = {}, Cd = {}, f = 0; 65 > f; f++) Bd[f] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(f), Cd[f] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(f);
                    f = Cd;
                    k = [];
                    for (g = 0; g < b.length; g += 3) {
                        var m = b[g],
                            n = g + 1 < b.length,
                            t = n ? b[g + 1] : 0,
                            Z = g + 2 < b.length,
                            P = Z ? b[g + 2] : 0;
                        h = m >> 2;
                        var ic = (m & 3) << 4 | t >> 4,
                            Ka = (t & 15) << 2 | P >> 6,
                            mb = P & 63;
                        Z || (mb = 64, n || (Ka = 64));
                        k.push(f[h], f[ic], f[Ka], f[mb])
                    }
                    d = k.join("")
                } catch (jc) {}
                a += String.fromCharCode(c++) + "=" + d + "&"
            });
            return a.slice(0, -1)
        },
        Ck =
        function() {
            if (!wk) {
                var a = function() {
                    xk = !0;
                    H.document.removeEventListener("webdriver-evaluate", a, !0)
                };
                H.document.addEventListener("webdriver-evaluate", a, !0);
                var b = function() {
                    yk = !0;
                    H.document.removeEventListener("webdriver-evaluate-response", b, !0)
                };
                H.document.addEventListener("webdriver-evaluate-response", b, !0);
                wk = !0
            }
        };
    var Ek = function() {
        this.Ib = -1
    };
    var Fk = function() {
        this.Ib = 64;
        this.da = Array(4);
        this.pl = Array(this.Ib);
        this.Lf = this.rd = 0;
        this.reset()
    };
    Ja(Fk, Ek);
    Fk.prototype.reset = function() {
        this.da[0] = 1732584193;
        this.da[1] = 4023233417;
        this.da[2] = 2562383102;
        this.da[3] = 271733878;
        this.Lf = this.rd = 0
    };
    var Gk = function(a, b, c) {
        c || (c = 0);
        var d = Array(16);
        if (v(b))
            for (var e = 0; 16 > e; ++e) d[e] = b.charCodeAt(c++) | b.charCodeAt(c++) << 8 | b.charCodeAt(c++) << 16 | b.charCodeAt(c++) << 24;
        else
            for (e = 0; 16 > e; ++e) d[e] = b[c++] | b[c++] << 8 | b[c++] << 16 | b[c++] << 24;
        b = a.da[0];
        c = a.da[1];
        e = a.da[2];
        var f = a.da[3];
        var g = b + (f ^ c & (e ^ f)) + d[0] + 3614090360 & 4294967295;
        b = c + (g << 7 & 4294967295 | g >>> 25);
        g = f + (e ^ b & (c ^ e)) + d[1] + 3905402710 & 4294967295;
        f = b + (g << 12 & 4294967295 | g >>> 20);
        g = e + (c ^ f & (b ^ c)) + d[2] + 606105819 & 4294967295;
        e = f + (g << 17 & 4294967295 | g >>> 15);
        g = c + (b ^
            e & (f ^ b)) + d[3] + 3250441966 & 4294967295;
        c = e + (g << 22 & 4294967295 | g >>> 10);
        g = b + (f ^ c & (e ^ f)) + d[4] + 4118548399 & 4294967295;
        b = c + (g << 7 & 4294967295 | g >>> 25);
        g = f + (e ^ b & (c ^ e)) + d[5] + 1200080426 & 4294967295;
        f = b + (g << 12 & 4294967295 | g >>> 20);
        g = e + (c ^ f & (b ^ c)) + d[6] + 2821735955 & 4294967295;
        e = f + (g << 17 & 4294967295 | g >>> 15);
        g = c + (b ^ e & (f ^ b)) + d[7] + 4249261313 & 4294967295;
        c = e + (g << 22 & 4294967295 | g >>> 10);
        g = b + (f ^ c & (e ^ f)) + d[8] + 1770035416 & 4294967295;
        b = c + (g << 7 & 4294967295 | g >>> 25);
        g = f + (e ^ b & (c ^ e)) + d[9] + 2336552879 & 4294967295;
        f = b + (g << 12 & 4294967295 | g >>> 20);
        g = e + (c ^ f & (b ^ c)) + d[10] + 4294925233 & 4294967295;
        e = f + (g << 17 & 4294967295 | g >>> 15);
        g = c + (b ^ e & (f ^ b)) + d[11] + 2304563134 & 4294967295;
        c = e + (g << 22 & 4294967295 | g >>> 10);
        g = b + (f ^ c & (e ^ f)) + d[12] + 1804603682 & 4294967295;
        b = c + (g << 7 & 4294967295 | g >>> 25);
        g = f + (e ^ b & (c ^ e)) + d[13] + 4254626195 & 4294967295;
        f = b + (g << 12 & 4294967295 | g >>> 20);
        g = e + (c ^ f & (b ^ c)) + d[14] + 2792965006 & 4294967295;
        e = f + (g << 17 & 4294967295 | g >>> 15);
        g = c + (b ^ e & (f ^ b)) + d[15] + 1236535329 & 4294967295;
        c = e + (g << 22 & 4294967295 | g >>> 10);
        g = b + (e ^ f & (c ^ e)) + d[1] + 4129170786 & 4294967295;
        b = c + (g << 5 & 4294967295 |
            g >>> 27);
        g = f + (c ^ e & (b ^ c)) + d[6] + 3225465664 & 4294967295;
        f = b + (g << 9 & 4294967295 | g >>> 23);
        g = e + (b ^ c & (f ^ b)) + d[11] + 643717713 & 4294967295;
        e = f + (g << 14 & 4294967295 | g >>> 18);
        g = c + (f ^ b & (e ^ f)) + d[0] + 3921069994 & 4294967295;
        c = e + (g << 20 & 4294967295 | g >>> 12);
        g = b + (e ^ f & (c ^ e)) + d[5] + 3593408605 & 4294967295;
        b = c + (g << 5 & 4294967295 | g >>> 27);
        g = f + (c ^ e & (b ^ c)) + d[10] + 38016083 & 4294967295;
        f = b + (g << 9 & 4294967295 | g >>> 23);
        g = e + (b ^ c & (f ^ b)) + d[15] + 3634488961 & 4294967295;
        e = f + (g << 14 & 4294967295 | g >>> 18);
        g = c + (f ^ b & (e ^ f)) + d[4] + 3889429448 & 4294967295;
        c = e + (g << 20 & 4294967295 |
            g >>> 12);
        g = b + (e ^ f & (c ^ e)) + d[9] + 568446438 & 4294967295;
        b = c + (g << 5 & 4294967295 | g >>> 27);
        g = f + (c ^ e & (b ^ c)) + d[14] + 3275163606 & 4294967295;
        f = b + (g << 9 & 4294967295 | g >>> 23);
        g = e + (b ^ c & (f ^ b)) + d[3] + 4107603335 & 4294967295;
        e = f + (g << 14 & 4294967295 | g >>> 18);
        g = c + (f ^ b & (e ^ f)) + d[8] + 1163531501 & 4294967295;
        c = e + (g << 20 & 4294967295 | g >>> 12);
        g = b + (e ^ f & (c ^ e)) + d[13] + 2850285829 & 4294967295;
        b = c + (g << 5 & 4294967295 | g >>> 27);
        g = f + (c ^ e & (b ^ c)) + d[2] + 4243563512 & 4294967295;
        f = b + (g << 9 & 4294967295 | g >>> 23);
        g = e + (b ^ c & (f ^ b)) + d[7] + 1735328473 & 4294967295;
        e = f + (g << 14 & 4294967295 |
            g >>> 18);
        g = c + (f ^ b & (e ^ f)) + d[12] + 2368359562 & 4294967295;
        c = e + (g << 20 & 4294967295 | g >>> 12);
        g = b + (c ^ e ^ f) + d[5] + 4294588738 & 4294967295;
        b = c + (g << 4 & 4294967295 | g >>> 28);
        g = f + (b ^ c ^ e) + d[8] + 2272392833 & 4294967295;
        f = b + (g << 11 & 4294967295 | g >>> 21);
        g = e + (f ^ b ^ c) + d[11] + 1839030562 & 4294967295;
        e = f + (g << 16 & 4294967295 | g >>> 16);
        g = c + (e ^ f ^ b) + d[14] + 4259657740 & 4294967295;
        c = e + (g << 23 & 4294967295 | g >>> 9);
        g = b + (c ^ e ^ f) + d[1] + 2763975236 & 4294967295;
        b = c + (g << 4 & 4294967295 | g >>> 28);
        g = f + (b ^ c ^ e) + d[4] + 1272893353 & 4294967295;
        f = b + (g << 11 & 4294967295 | g >>> 21);
        g = e + (f ^
            b ^ c) + d[7] + 4139469664 & 4294967295;
        e = f + (g << 16 & 4294967295 | g >>> 16);
        g = c + (e ^ f ^ b) + d[10] + 3200236656 & 4294967295;
        c = e + (g << 23 & 4294967295 | g >>> 9);
        g = b + (c ^ e ^ f) + d[13] + 681279174 & 4294967295;
        b = c + (g << 4 & 4294967295 | g >>> 28);
        g = f + (b ^ c ^ e) + d[0] + 3936430074 & 4294967295;
        f = b + (g << 11 & 4294967295 | g >>> 21);
        g = e + (f ^ b ^ c) + d[3] + 3572445317 & 4294967295;
        e = f + (g << 16 & 4294967295 | g >>> 16);
        g = c + (e ^ f ^ b) + d[6] + 76029189 & 4294967295;
        c = e + (g << 23 & 4294967295 | g >>> 9);
        g = b + (c ^ e ^ f) + d[9] + 3654602809 & 4294967295;
        b = c + (g << 4 & 4294967295 | g >>> 28);
        g = f + (b ^ c ^ e) + d[12] + 3873151461 & 4294967295;
        f = b + (g << 11 & 4294967295 | g >>> 21);
        g = e + (f ^ b ^ c) + d[15] + 530742520 & 4294967295;
        e = f + (g << 16 & 4294967295 | g >>> 16);
        g = c + (e ^ f ^ b) + d[2] + 3299628645 & 4294967295;
        c = e + (g << 23 & 4294967295 | g >>> 9);
        g = b + (e ^ (c | ~f)) + d[0] + 4096336452 & 4294967295;
        b = c + (g << 6 & 4294967295 | g >>> 26);
        g = f + (c ^ (b | ~e)) + d[7] + 1126891415 & 4294967295;
        f = b + (g << 10 & 4294967295 | g >>> 22);
        g = e + (b ^ (f | ~c)) + d[14] + 2878612391 & 4294967295;
        e = f + (g << 15 & 4294967295 | g >>> 17);
        g = c + (f ^ (e | ~b)) + d[5] + 4237533241 & 4294967295;
        c = e + (g << 21 & 4294967295 | g >>> 11);
        g = b + (e ^ (c | ~f)) + d[12] + 1700485571 & 4294967295;
        b = c +
            (g << 6 & 4294967295 | g >>> 26);
        g = f + (c ^ (b | ~e)) + d[3] + 2399980690 & 4294967295;
        f = b + (g << 10 & 4294967295 | g >>> 22);
        g = e + (b ^ (f | ~c)) + d[10] + 4293915773 & 4294967295;
        e = f + (g << 15 & 4294967295 | g >>> 17);
        g = c + (f ^ (e | ~b)) + d[1] + 2240044497 & 4294967295;
        c = e + (g << 21 & 4294967295 | g >>> 11);
        g = b + (e ^ (c | ~f)) + d[8] + 1873313359 & 4294967295;
        b = c + (g << 6 & 4294967295 | g >>> 26);
        g = f + (c ^ (b | ~e)) + d[15] + 4264355552 & 4294967295;
        f = b + (g << 10 & 4294967295 | g >>> 22);
        g = e + (b ^ (f | ~c)) + d[6] + 2734768916 & 4294967295;
        e = f + (g << 15 & 4294967295 | g >>> 17);
        g = c + (f ^ (e | ~b)) + d[13] + 1309151649 & 4294967295;
        c = e + (g << 21 & 4294967295 | g >>> 11);
        g = b + (e ^ (c | ~f)) + d[4] + 4149444226 & 4294967295;
        b = c + (g << 6 & 4294967295 | g >>> 26);
        g = f + (c ^ (b | ~e)) + d[11] + 3174756917 & 4294967295;
        f = b + (g << 10 & 4294967295 | g >>> 22);
        g = e + (b ^ (f | ~c)) + d[2] + 718787259 & 4294967295;
        e = f + (g << 15 & 4294967295 | g >>> 17);
        g = c + (f ^ (e | ~b)) + d[9] + 3951481745 & 4294967295;
        a.da[0] = a.da[0] + b & 4294967295;
        a.da[1] = a.da[1] + (e + (g << 21 & 4294967295 | g >>> 11)) & 4294967295;
        a.da[2] = a.da[2] + e & 4294967295;
        a.da[3] = a.da[3] + f & 4294967295
    };
    Fk.prototype.update = function(a, b) {
        u(b) || (b = a.length);
        for (var c = b - this.Ib, d = this.pl, e = this.rd, f = 0; f < b;) {
            if (0 == e)
                for (; f <= c;) Gk(this, a, f), f += this.Ib;
            if (v(a))
                for (; f < b;) {
                    if (d[e++] = a.charCodeAt(f++), e == this.Ib) {
                        Gk(this, d);
                        e = 0;
                        break
                    }
                } else
                    for (; f < b;)
                        if (d[e++] = a[f++], e == this.Ib) {
                            Gk(this, d);
                            e = 0;
                            break
                        }
        }
        this.rd = e;
        this.Lf += b
    };
    Fk.prototype.digest = function() {
        var a = Array((56 > this.rd ? this.Ib : 2 * this.Ib) - this.rd);
        a[0] = 128;
        for (var b = 1; b < a.length - 8; ++b) a[b] = 0;
        var c = 8 * this.Lf;
        for (b = a.length - 8; b < a.length; ++b) a[b] = c & 255, c /= 256;
        this.update(a);
        a = Array(16);
        for (b = c = 0; 4 > b; ++b)
            for (var d = 0; 32 > d; d += 8) a[c++] = this.da[b] >>> d & 255;
        return a
    };
    var Hk = function() {
        this.rh = null
    };
    q(Hk, oj);
    Hk.prototype.ac = function(a) {
        var b = oj.prototype.ac.call(this, a);
        var c = vk = Ha();
        var d = U(5);
        c = (xk ? !d : d) ? c | 2 : c & -3;
        d = U(2);
        c = (yk ? !d : d) ? c | 8 : c & -9;
        c = {
            s1: (c >>> 0).toString(16)
        };
        this.rh || (this.rh = Dk());
        b.Jj = this.rh;
        b.Kj = nj(a, ej, c, "h", Ik("kArwaWEsTs"));
        b.rj = nj(a, gj, {}, "h", Ik("b96YPMzfnx"));
        b.Pi = nj(a, hj, {}, "h", Ik("yb8Wev6QDg"));
        return b
    };
    var Ik = function(a) {
        return function(b) {
            var c = new Fk;
            c.update(b + a);
            return zd(c.digest()).slice(-8)
        }
    };
    var Jk = function(a, b) {
        this.ql = a;
        this.Ul = b
    };
    Jk.prototype.Oa = function(a, b) {
        var c = this.Ig(b);
        if (x(c)) {
            var d = this.cj(a, b);
            try {
                return c(b.va, d, a), 0
            } catch (e) {
                return 2
            }
        } else return 1
    };
    Jk.prototype.cj = function(a, b) {
        var c = {};
        c = (c.sv = "651", c.cb = "j", c.e = Kk(a), c);
        var d = dh(b, a, R.P());
        Qb(c, d);
        b.si[a] = d;
        return 2 == b.Ha() ? Tf(c).join("&") : this.Ul.ac(c).ue
    };
    var Kk = function(a) {
        var b = Nb(function(b) {
            return b == a
        });
        return Eg[b]
    };
    Jk.prototype.Ig = function() {
        return xa(this.ql)
    };
    var Lk = function(a, b, c) {
        Jk.call(this, a, b);
        this.se = c
    };
    q(Lk, Jk);
    Lk.prototype.Ig = function(a) {
        if (!a.Sb) return Jk.prototype.Ig.call(this, a);
        var b = this.se[a.Sb];
        if (b) return function(a, d, e) {
            b.ko(a, d, e)
        };
        De(393, Error());
        return null
    };
    var Mk = function() {
            this.Af = void 0
        },
        Nk = function(a, b, c) {
            if (null == b) c.push("null");
            else {
                if ("object" == typeof b) {
                    if (Ba(b)) {
                        var d = b;
                        b = d.length;
                        c.push("[");
                        for (var e = "", f = 0; f < b; f++) c.push(e), e = d[f], Nk(a, a.Af ? a.Af.call(d, String(f), e) : e, c), e = ",";
                        c.push("]");
                        return
                    }
                    if (b instanceof String || b instanceof Number || b instanceof Boolean) b = b.valueOf();
                    else {
                        c.push("{");
                        f = "";
                        for (d in b) Object.prototype.hasOwnProperty.call(b, d) && (e = b[d], "function" != typeof e && (c.push(f), Ok(d, c), c.push(":"), Nk(a, a.Af ? a.Af.call(b, d, e) : e,
                            c), f = ","));
                        c.push("}");
                        return
                    }
                }
                switch (typeof b) {
                    case "string":
                        Ok(b, c);
                        break;
                    case "number":
                        c.push(isFinite(b) && !isNaN(b) ? String(b) : "null");
                        break;
                    case "boolean":
                        c.push(String(b));
                        break;
                    case "function":
                        c.push("null");
                        break;
                    default:
                        throw Error("Unknown type: " + typeof b);
                }
            }
        },
        Pk = {
            '"': '\\"',
            "\\": "\\\\",
            "/": "\\/",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t",
            "\x0B": "\\u000b"
        },
        Qk = /\uffff/.test("\uffff") ? /[\\"\x00-\x1f\x7f-\uffff]/g : /[\\"\x00-\x1f\x7f-\xff]/g,
        Ok = function(a, b) {
            b.push('"', a.replace(Qk,
                function(a) {
                    var b = Pk[a];
                    b || (b = "\\u" + (a.charCodeAt(0) | 65536).toString(16).substr(1), Pk[a] = b);
                    return b
                }), '"')
        };
    var Rk = function(a, b) {
            this.bn = a;
            this.depth = b
        },
        Tk = function() {
            var a = Yd(),
                b = Math.max(a.length - 1, 0),
                c = ae(a);
            a = c.ei;
            var d = c.fi,
                e = c.ml,
                f = [];
            c = function(a, b) {
                return null == a ? b : a
            };
            e && f.push(new Rk([e.url, e.bh ? 2 : 0], c(e.depth, 1)));
            d && d != e && f.push(new Rk([d.url, 2], 0));
            a.url && a != e && f.push(new Rk([a.url, 0], c(a.depth, b)));
            var g = Wa(f, function(a, b) {
                return f.slice(0, f.length - b)
            });
            !a.url || (e || d) && a != e || (d = hd(a.url)) && g.push([new Rk([d, 1], c(a.depth, b))]);
            g.push([]);
            return Wa(g, function(a) {
                return Sk(b, a)
            })
        };

    function Sk(a, b) {
        z(Za(b, function(a) {
            return 0 <= a.depth
        }));
        var c = Xa(b, function(a, b) {
                return Math.max(a, b.depth)
            }, -1),
            d = jb(c + 2);
        d[0] = a;
        A(b, function(a) {
            return d[a.depth + 1] = a.bn
        });
        return d
    }
    var Uk = function() {
        var a = Tk();
        return Wa(a, function(a) {
            return de(a)
        })
    };
    var Vk = function() {
        S.call(this);
        this.th = void 0;
        this.Vj = null;
        this.tj = !1;
        this.se = {};
        this.al = 0;
        this.xc = new Hk
    };
    q(Vk, S);
    Vk.prototype.Kg = function(a, b) {
        var c = this;
        switch (M.g().l) {
            case "nis":
                a = Wk(this, a, b);
                break;
            case "gsv":
                a = Xk(this, a, b);
                break;
            case "exc":
                a = Yk(this, a);
                break;
            default:
                a = b.opt_overlayAdElement ? void 0 : b.opt_adElement ? lk(this, a, b.opt_adElement, b.opt_osdId) : Oi(a) || void 0
        }
        a && 1 == a.Ha() && (a.yb == ya && (a.yb = function(a) {
            return c.yb(a)
        }), Zk(this, a, b));
        return a
    };
    var Zk = function(a, b, c) {
        var d = c.opt_configurable_tracking_events;
        if (null != a.gb && Ba(d)) {
            var e = a.gb;
            A(d, function(a) {
                if (!(1 < $a(d, function(b) {
                        return b.id == a.id || b.event == a.event
                    }))) {
                    var c = Wa(a.Un, function(a) {
                        var b = rk(a);
                        if (null == b) a = null;
                        else if (a = new qk, null != b.visible && (a.Ac = b.visible / 100), null != b.audible && (a.ae = 1 == b.audible), null != b.time) {
                            var c = "mtos" == b.timetype ? "mtos" : "tos",
                                d = b.time,
                                e = d.length - 1;
                            d = 0 <= e && d.indexOf("%", e) == e ? "%" : "ms";
                            b = parseInt(b.time, 10);
                            "%" == d && (b /= 100);
                            a.setTime(b, d, c)
                        }
                        return a
                    });
                    Ya(c, function(a) {
                        return null == a
                    }) || Zg(b, new tk(a.id, a.event, c, e))
                }
            })
        }
    };
    Vk.prototype.yb = function(a) {
        var b = M.g();
        a.F = 0;
        a.Tf = 0;
        if ("h" == a.ob || "n" == a.ob) {
            if ("exc" == b.l || "nis" == b.l) var c = xa("ima.bridge.getVideoMetadata");
            else if (a.Sb && $k(this)) {
                var d = this.se[a.Sb];
                d ? c = function(a) {
                    d.yb(a)
                } : null !== d && De("lidar::missingPlayerCallback", Error())
            } else c = xa("ima.common.getVideoMetadata");
            if (x(c)) try {
                var e = c(a.va)
            } catch (f) {
                a.F |= 4
            } else a.F |= 2
        } else if ("b" == a.ob)
            if (b = xa("ytads.bulleit.getVideoMetadata"), x(b)) try {
                e = b(a.va)
            } catch (f) {
                a.F |= 4
            } else a.F |= 2;
            else if ("ml" == a.ob)
            if (b = xa("ima.common.getVideoMetadata"),
                x(b)) try {
                e = b(a.va)
            } catch (f) {
                a.F |= 4
            } else a.F |= 2;
            else a.F |= 1;
        a.F || (u(e) ? null === e ? a.F |= 16 : Ob(e) ? a.F |= 32 : null != e.errorCode && (a.Tf = e.errorCode, a.F |= 64) : a.F |= 8);
        null != e || (e = {});
        nk(e, a);
        Pe(e.volume) && Pe(this.th) && (e.volume *= this.th);
        return e
    };
    var Xk = function(a, b, c) {
            var d = Oi(b);
            d || (d = c.opt_nativeTime || -1, d = Qj(a, b, Uj(a), d), c.opt_osdId && (d.Sb = c.opt_osdId));
            return d
        },
        Wk = function(a, b, c) {
            var d = Oi(b);
            d || (d = Qj(a, b, "n", c.opt_nativeTime || -1), d.sj = M.g().Wl);
            return d
        },
        Yk = function(a, b) {
            var c = Oi(b);
            c || (c = Qj(a, b, "h", -1));
            return c
        };
    Vk.prototype.Li = function() {
        if ($k(this)) return new Lk("ima.common.triggerExternalActivityEvent", this.xc, this.se);
        var a = al(this);
        return null != a ? new Jk(a, this.xc) : null
    };
    var al = function(a) {
        var b = M.g();
        switch (Uj(a)) {
            case "b":
                return "ytads.bulleit.triggerExternalActivityEvent";
            case "n":
                return "ima.bridge.triggerExternalActivityEvent";
            case "h":
                if ("exc" == b.l) return "ima.bridge.triggerExternalActivityEvent";
            case "m":
            case "ml":
                return "ima.common.triggerExternalActivityEvent"
        }
        return null
    };
    Vk.prototype.Lg = function() {
        var a = this.gb,
            b = S.prototype.Lg.call(this);
        b.push(new uk(a));
        return b
    };
    Vk.prototype.Ph = function(a) {
        !a.$k && a.bd && Vj(this, a, "overlay_unmeasurable_impression") && (a.$k = !0)
    };
    Vk.prototype.Xj = function(a) {
        a.pk && (a.qc() ? Vj(this, a, "overlay_viewable_end_of_session_impression") : Vj(this, a, "overlay_unviewable_impression"), a.pk = !1)
    };
    var bl = function(a, b, c, d) {
        c = void 0 === c ? {} : c;
        var e = {};
        Qb(e, {
            opt_adElement: void 0,
            opt_fullscreen: void 0
        }, c);
        if (e.opt_bounds) return a.xc.ac(jj("ol", d));
        if (u(d))
            if (c = ij(d), u(c))
                if (Wi) b = jj("ue", d);
                else if (b = a.Kg(b, e)) {
            b: {
                Tj(a);
                "i" == Vi && (b.bd = !0, a.Vh(b));c = e.opt_fullscreen;u(c) && (b.ib = !!c);wb(Fb, "CrKey") || wb(Fb, "PlayStation") || wb(Fb, "Roku") || Ti() || wb(Fb, "Xbox") ? c = !1 : (c = M.g().l, c = H && H.jo || "nis" === c || "gsv" === c ? !1 : 0 === Je());
                var f = c;
                if (f) {
                    switch (b.Ha()) {
                        case 1:
                            Wj(a, b, "pv");
                            break;
                        case 2:
                            a.Ph(b)
                    }
                    R.Ya.cancel();
                    Vi = "pv";
                    R.done = !0
                }
                c = d.toLowerCase();!f && 0 <= Ua(Bg, c) && Yj(a, b, e);0 != b.V && 0 <= Ua(Cg, c) && !b.bd && !a.df && b.Sd && (f = b.Sd, f.kd || (f.kd = Qg(f, b)));
                (f = b.Hc[c]) && b.X.na(f);
                switch (b.Ha()) {
                    case 1:
                        var g = a.Rl[c];
                        break;
                    case 2:
                        g = a.Hm[c]
                }
                if (g && (d = g.call(a, b, e, d), u(d))) {
                    e = jj(void 0, c);
                    Qb(e, d);
                    d = e;
                    break b
                }
                d = void 0
            }
            3 == b.V && a.Oe(b);b = d
        }
        else b = jj("nf", d);
        else b = void 0;
        else b = a.Ue(b, e);
        return a.xc.ac(b)
    };
    Vk.prototype.Og = function(a) {
        this.df && 1 == a.Ha() && cl(this, a)
    };
    Vk.prototype.Vh = function(a) {
        this.df && 1 == a.Ha() && cl(this, a)
    };
    var cl = function(a, b) {
            var c;
            if (b.Sb && $k(a)) {
                var d = a.se[b.Sb];
                d ? c = function(a, b) {
                    d.lo(a, b)
                } : null !== d && De("lidar::missingPlayerCallback", Error())
            } else c = xa("ima.common.triggerViewabilityMeasurementUpdate");
            if (x(c)) {
                var e = ah(b);
                e.nativeVolume = a.th;
                c(b.va, e)
            }
        },
        $k = function(a) {
            return "exc" == M.g().l || "h" != Uj(a) && "m" != Uj(a) ? !1 : 0 != a.al
        };
    Vk.prototype.zf = function(a, b, c, d) {
        a = S.prototype.zf.call(this, a, b, c, d);
        this.tj && this.Vj.registerAdBlock(a);
        return a
    };
    Vk.prototype.Oe = function(a) {
        a && 1 == a.Ha() && this.tj && this.Vj.mo(a);
        return S.prototype.Oe.call(this, a)
    };
    var dl = function(a) {
            var b = {};
            return b.viewability = a.ue, b.googleViewability = a.gj, b.moatInit = a.Jj, b.moatViewability = a.Kj, b.integralAdsViewability = a.rj, b.doubleVerifyViewability = a.Pi, b
        },
        el = function(a, b, c) {
            c = void 0 === c ? {} : c;
            a = bl(Vk.g(), b, c, a);
            return dl(a)
        };
    za(Vk);
    Ia("Goog_AdSense_Lidar_sendVastEvent", Ce(193, el, void 0, function() {
        var a = M.g(),
            b = {};
        return b.sv = "651", b["if"] = a.jb ? "1" : "0", b.nas = String(R.pa.length), b
    }));
    Ia("Goog_AdSense_Lidar_getViewability", Ce(194, function(a, b) {
        b = void 0 === b ? {} : b;
        a = bl(Vk.g(), a, b);
        return dl(a)
    }));
    Ia("Goog_AdSense_Lidar_getUrlSignalsArray", Ce(195, function() {
        return Uk()
    }));
    Ia("Goog_AdSense_Lidar_getUrlSignalsList", Ce(196, function() {
        var a = Uk(),
            b = [];
        Nk(new Mk, a, b);
        return b.join("")
    }));
    var fl = function(a, b) {
        this.R = {};
        this.C = [];
        this.oe = this.I = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2) throw Error("Uneven number of arguments");
            for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
        } else a && this.addAll(a)
    };
    l = fl.prototype;
    l.ej = function() {
        return this.I
    };
    l.hb = function() {
        gl(this);
        for (var a = [], b = 0; b < this.C.length; b++) a.push(this.R[this.C[b]]);
        return a
    };
    l.xb = function() {
        gl(this);
        return this.C.concat()
    };
    l.wd = function(a) {
        return hl(this.R, a)
    };
    l.Bd = function(a, b) {
        if (this === a) return !0;
        if (this.I != a.ej()) return !1;
        b = b || il;
        gl(this);
        for (var c, d = 0; c = this.C[d]; d++)
            if (!b(this.get(c), a.get(c))) return !1;
        return !0
    };
    var il = function(a, b) {
        return a === b
    };
    fl.prototype.clear = function() {
        this.R = {};
        this.oe = this.I = this.C.length = 0
    };
    fl.prototype.remove = function(a) {
        return hl(this.R, a) ? (delete this.R[a], this.I--, this.oe++, this.C.length > 2 * this.I && gl(this), !0) : !1
    };
    var gl = function(a) {
        if (a.I != a.C.length) {
            for (var b = 0, c = 0; b < a.C.length;) {
                var d = a.C[b];
                hl(a.R, d) && (a.C[c++] = d);
                b++
            }
            a.C.length = c
        }
        if (a.I != a.C.length) {
            var e = {};
            for (c = b = 0; b < a.C.length;) d = a.C[b], hl(e, d) || (a.C[c++] = d, e[d] = 1), b++;
            a.C.length = c
        }
    };
    l = fl.prototype;
    l.get = function(a, b) {
        return hl(this.R, a) ? this.R[a] : b
    };
    l.set = function(a, b) {
        hl(this.R, a) || (this.I++, this.C.push(a), this.oe++);
        this.R[a] = b
    };
    l.addAll = function(a) {
        if (a instanceof fl)
            for (var b = a.xb(), c = 0; c < b.length; c++) this.set(b[c], a.get(b[c]));
        else
            for (b in a) this.set(b, a[b])
    };
    l.forEach = function(a, b) {
        for (var c = this.xb(), d = 0; d < c.length; d++) {
            var e = c[d],
                f = this.get(e);
            a.call(b, f, e, this)
        }
    };
    l.clone = function() {
        return new fl(this)
    };
    l.Xk = function(a) {
        gl(this);
        var b = 0,
            c = this.oe,
            d = this,
            e = new og;
        e.next = function() {
            if (c != d.oe) throw Error("The map has changed since the iterator was created");
            if (b >= d.C.length) throw ng;
            var e = d.C[b++];
            return a ? e : d.R[e]
        };
        return e
    };
    var hl = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };
    var jl = function(a) {
            if (a.hb && "function" == typeof a.hb) return a.hb();
            if (v(a)) return a.split("");
            if (Ca(a)) {
                for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
                return b
            }
            return Kb(a)
        },
        kl = function(a, b, c) {
            if (a.forEach && "function" == typeof a.forEach) a.forEach(b, c);
            else if (Ca(a) || v(a)) A(a, b, c);
            else {
                if (a.xb && "function" == typeof a.xb) var d = a.xb();
                else if (a.hb && "function" == typeof a.hb) d = void 0;
                else if (Ca(a) || v(a)) {
                    d = [];
                    for (var e = a.length, f = 0; f < e; f++) d.push(f)
                } else d = Lb(a);
                e = jl(a);
                f = e.length;
                for (var g = 0; g < f; g++) b.call(c,
                    e[g], d && d[g], a)
            }
        };
    var ll = function(a) {
        this.ea = this.Fc = this.Db = "";
        this.fd = null;
        this.kc = this.$ = "";
        this.Ja = this.Xl = !1;
        if (a instanceof ll) {
            this.Ja = u(void 0) ? void 0 : a.Ja;
            ml(this, a.Db);
            var b = a.Fc;
            V(this);
            this.Fc = b;
            b = a.ea;
            V(this);
            this.ea = b;
            nl(this, a.fd);
            b = a.$;
            V(this);
            this.$ = b;
            ol(this, a.Na.clone());
            a = a.kc;
            V(this);
            this.kc = a
        } else a && (b = String(a).match(Vd)) ? (this.Ja = !1, ml(this, b[1] || "", !0), a = b[2] || "", V(this), this.Fc = pl(a), a = b[3] || "", V(this), this.ea = pl(a, !0), nl(this, b[4]), a = b[5] || "", V(this), this.$ = pl(a, !0), ol(this, b[6] || "", !0),
            a = b[7] || "", V(this), this.kc = pl(a)) : (this.Ja = !1, this.Na = new ql(null, this.Ja))
    };
    ll.prototype.toString = function() {
        var a = [],
            b = this.Db;
        b && a.push(rl(b, sl, !0), ":");
        var c = this.ea;
        if (c || "file" == b) a.push("//"), (b = this.Fc) && a.push(rl(b, sl, !0), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.fd, null != c && a.push(":", String(c));
        if (c = this.$) this.ea && "/" != c.charAt(0) && a.push("/"), a.push(rl(c, "/" == c.charAt(0) ? tl : ul, !0));
        (c = this.Na.toString()) && a.push("?", c);
        (c = this.kc) && a.push("#", rl(c, vl));
        return a.join("")
    };
    ll.prototype.resolve = function(a) {
        var b = this.clone(),
            c = !!a.Db;
        c ? ml(b, a.Db) : c = !!a.Fc;
        if (c) {
            var d = a.Fc;
            V(b);
            b.Fc = d
        } else c = !!a.ea;
        c ? (d = a.ea, V(b), b.ea = d) : c = null != a.fd;
        d = a.$;
        if (c) nl(b, a.fd);
        else if (c = !!a.$) {
            if ("/" != d.charAt(0))
                if (this.ea && !this.$) d = "/" + d;
                else {
                    var e = b.$.lastIndexOf("/"); - 1 != e && (d = b.$.substr(0, e + 1) + d)
                }
            e = d;
            if (".." == e || "." == e) d = "";
            else if (-1 != e.indexOf("./") || -1 != e.indexOf("/.")) {
                d = 0 == e.lastIndexOf("/", 0);
                e = e.split("/");
                for (var f = [], g = 0; g < e.length;) {
                    var h = e[g++];
                    "." == h ? d && g == e.length && f.push("") :
                        ".." == h ? ((1 < f.length || 1 == f.length && "" != f[0]) && f.pop(), d && g == e.length && f.push("")) : (f.push(h), d = !0)
                }
                d = f.join("/")
            } else d = e
        }
        c ? (V(b), b.$ = d) : c = "" !== a.Na.toString();
        c ? ol(b, a.Na.clone()) : c = !!a.kc;
        c && (a = a.kc, V(b), b.kc = a);
        return b
    };
    ll.prototype.clone = function() {
        return new ll(this)
    };
    var ml = function(a, b, c) {
            V(a);
            a.Db = c ? pl(b, !0) : b;
            a.Db && (a.Db = a.Db.replace(/:$/, ""))
        },
        nl = function(a, b) {
            V(a);
            if (b) {
                b = Number(b);
                if (isNaN(b) || 0 > b) throw Error("Bad port number " + b);
                a.fd = b
            } else a.fd = null
        },
        ol = function(a, b, c) {
            V(a);
            b instanceof ql ? (a.Na = b, a.Na.Wh(a.Ja)) : (c || (b = rl(b, wl)), a.Na = new ql(b, a.Ja))
        };
    ll.prototype.removeParameter = function(a) {
        V(this);
        this.Na.remove(a);
        return this
    };
    var V = function(a) {
        if (a.Xl) throw Error("Tried to modify a read-only Uri");
    };
    ll.prototype.Wh = function(a) {
        this.Ja = a;
        this.Na && this.Na.Wh(a)
    };
    var pl = function(a, b) {
            return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
        },
        rl = function(a, b, c) {
            return v(a) ? (a = encodeURI(a).replace(b, xl), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null
        },
        xl = function(a) {
            a = a.charCodeAt(0);
            return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
        },
        sl = /[#\/\?@]/g,
        ul = /[#\?:]/g,
        tl = /[#\?]/g,
        wl = /[#\?@]/g,
        vl = /#/g,
        ql = function(a, b) {
            this.I = this.L = null;
            this.ya = a || null;
            this.Ja = !!b
        },
        yl = function(a) {
            a.L || (a.L = new fl, a.I = 0, a.ya && Wd(a.ya, function(b, c) {
                a.add(decodeURIComponent(b.replace(/\+/g,
                    " ")), c)
            }))
        };
    l = ql.prototype;
    l.ej = function() {
        yl(this);
        return this.I
    };
    l.add = function(a, b) {
        yl(this);
        this.ya = null;
        a = zl(this, a);
        var c = this.L.get(a);
        c || this.L.set(a, c = []);
        c.push(b);
        this.I = Qa(this.I) + 1;
        return this
    };
    l.remove = function(a) {
        yl(this);
        a = zl(this, a);
        return this.L.wd(a) ? (this.ya = null, this.I = Qa(this.I) - this.L.get(a).length, this.L.remove(a)) : !1
    };
    l.clear = function() {
        this.L = this.ya = null;
        this.I = 0
    };
    l.wd = function(a) {
        yl(this);
        a = zl(this, a);
        return this.L.wd(a)
    };
    l.forEach = function(a, b) {
        yl(this);
        this.L.forEach(function(c, d) {
            A(c, function(c) {
                a.call(b, c, d, this)
            }, this)
        }, this)
    };
    l.xb = function() {
        yl(this);
        for (var a = this.L.hb(), b = this.L.xb(), c = [], d = 0; d < b.length; d++)
            for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
        return c
    };
    l.hb = function(a) {
        yl(this);
        var b = [];
        if (v(a)) this.wd(a) && (b = fb(b, this.L.get(zl(this, a))));
        else {
            a = this.L.hb();
            for (var c = 0; c < a.length; c++) b = fb(b, a[c])
        }
        return b
    };
    l.set = function(a, b) {
        yl(this);
        this.ya = null;
        a = zl(this, a);
        this.wd(a) && (this.I = Qa(this.I) - this.L.get(a).length);
        this.L.set(a, [b]);
        this.I = Qa(this.I) + 1;
        return this
    };
    l.get = function(a, b) {
        if (!a) return b;
        a = this.hb(a);
        return 0 < a.length ? String(a[0]) : b
    };
    l.toString = function() {
        if (this.ya) return this.ya;
        if (!this.L) return "";
        for (var a = [], b = this.L.xb(), c = 0; c < b.length; c++) {
            var d = b[c],
                e = encodeURIComponent(String(d));
            d = this.hb(d);
            for (var f = 0; f < d.length; f++) {
                var g = e;
                "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
                a.push(g)
            }
        }
        return this.ya = a.join("&")
    };
    l.clone = function() {
        var a = new ql;
        a.ya = this.ya;
        this.L && (a.L = this.L.clone(), a.I = this.I);
        return a
    };
    var zl = function(a, b) {
        b = String(b);
        a.Ja && (b = b.toLowerCase());
        return b
    };
    ql.prototype.Wh = function(a) {
        a && !this.Ja && (yl(this), this.ya = null, this.L.forEach(function(a, c) {
            var b = c.toLowerCase();
            c != b && (this.remove(c), this.remove(b), 0 < a.length && (this.ya = null, this.L.set(zl(this, b), gb(a)), this.I = Qa(this.I) + a.length))
        }, this));
        this.Ja = a
    };
    ql.prototype.extend = function(a) {
        for (var b = 0; b < arguments.length; b++) kl(arguments[b], function(a, b) {
            this.add(b, a)
        }, this)
    };
    var Al = 0,
        Bl = {},
        Dl = function(a) {
            var b = Bl.imageLoadingEnabled;
            if (null != b) a(b);
            else {
                var c = !1;
                Cl(function(b, e) {
                    delete Bl[e];
                    c || (c = !0, null != Bl.imageLoadingEnabled || (Bl.imageLoadingEnabled = b), a(b))
                })
            }
        },
        Cl = function(a) {
            var b = new Image,
                c = "" + Al++;
            Bl[c] = b;
            b.onload = function() {
                clearTimeout(d);
                a(!0, c)
            };
            var d = setTimeout(function() {
                a(!1, c)
            }, 300);
            b.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
        },
        El = function(a) {
            if (a) {
                var b = document.createElement("OBJECT");
                b.data = a;
                b.width = "1";
                b.height = "1";
                b.style.visibility = "hidden";
                var c = "" + Al++;
                Bl[c] = b;
                b.onload = b.onerror = function() {
                    delete Bl[c]
                };
                document.body.appendChild(b)
            }
        },
        Fl = function(a) {
            if (a) {
                var b = new Image,
                    c = "" + Al++;
                Bl[c] = b;
                b.onload = b.onerror = function() {
                    delete Bl[c]
                };
                b.src = a
            }
        },
        Gl = function(a, b) {
            a && (b ? Dl(function(b) {
                b ? Fl(a) : El(a)
            }) : Fl(a))
        };
    var Hl = function(a, b, c) {
        this.reset(a, b, c, void 0, void 0)
    };
    Hl.prototype.Wi = null;
    var Il = 0;
    Hl.prototype.reset = function(a, b, c, d, e) {
        "number" == typeof e || Il++;
        d || Ha();
        this.Qd = a;
        this.lm = b;
        delete this.Wi
    };
    Hl.prototype.kk = function(a) {
        this.Qd = a
    };
    Hl.prototype.getMessage = function() {
        return this.lm
    };
    var Jl = function(a) {
            this.Wd = a;
            this.nj = this.og = this.Qd = this.Ma = null
        },
        Kl = function(a, b) {
            this.name = a;
            this.value = b
        };
    Kl.prototype.toString = function() {
        return this.name
    };
    var Ll = new Kl("SEVERE", 1E3),
        Ml = new Kl("WARNING", 900),
        Nl = new Kl("INFO", 800),
        Ol = new Kl("CONFIG", 700),
        Pl = new Kl("FINE", 500);
    Jl.prototype.getName = function() {
        return this.Wd
    };
    Jl.prototype.getParent = function() {
        return this.Ma
    };
    Jl.prototype.dj = function() {
        this.og || (this.og = {});
        return this.og
    };
    Jl.prototype.kk = function(a) {
        this.Qd = a
    };
    var Ql = function(a) {
        if (a.Qd) return a.Qd;
        if (a.Ma) return Ql(a.Ma);
        Pa("Root logger has no level set.");
        return null
    };
    Jl.prototype.log = function(a, b, c) {
        if (a.value >= Ql(this).value)
            for (x(b) && (b = b()), a = new Hl(a, String(b), this.Wd), c && (a.Wi = c), c = this; c;) {
                var d = c,
                    e = a;
                if (d.nj)
                    for (var f = 0; b = d.nj[f]; f++) b(e);
                c = c.getParent()
            }
    };
    Jl.prototype.info = function(a, b) {
        this.log(Nl, a, b)
    };
    var Rl = {},
        Sl = null,
        Tl = function(a) {
            Sl || (Sl = new Jl(""), Rl[""] = Sl, Sl.kk(Ol));
            var b;
            if (!(b = Rl[a])) {
                b = new Jl(a);
                var c = a.lastIndexOf("."),
                    d = a.substr(c + 1);
                c = Tl(a.substr(0, c));
                c.dj()[d] = b;
                b.Ma = c;
                Rl[a] = b
            }
            return b
        };
    var Ul = function(a, b) {
            a && a.log(Ml, b, void 0)
        },
        Vl = function(a, b) {
            a && a.info(b, void 0)
        },
        Wl = function(a, b) {
            a && a.log(Pl, b, void 0)
        };
    var Xl = function(a, b, c) {
        this.Wd = a;
        this.Bl = b;
        this.nk = void 0 === c ? null : c;
        this.G = Tl("Macro")
    };
    Xl.prototype.getName = function() {
        return this.Wd
    };
    var Yl = function(a, b, c) {
        var d = void 0 === c ? {} : c;
        c = void 0 === d.Xd ? null : d.Xd;
        d = void 0 === d.Yd ? null : d.Yd;
        this.Ui = a;
        this.url = b;
        this.Xd = c;
        this.Yd = d
    };
    var Zl = function(a, b, c, d) {
            this.Ag = a;
            this.fn = b;
            this.rm = void 0 === c ? null : c;
            this.qm = void 0 === d ? null : d
        },
        $l = function(a) {
            var b = null,
                c = null;
            a.Xd ? b = parseInt(a.Xd / 1E3, 10) : a.Yd && (c = a.Yd);
            return new Zl(a.Ui, a.url, b, c)
        };
    Zl.prototype.Jd = function() {
        return this.fn
    };
    var am = function() {
        this.M = new Map;
        this.ka = new Map;
        this.adSystems = [];
        this.Kc = this.id = null
    };
    am.prototype.Vc = function() {
        return this.id
    };
    var bm = function(a, b) {
        a.M.has(b.Ag) ? a.M.get(b.Ag).push(b) : a.M.set(b.Ag, [b])
    };
    var cm = Tl("imalib.common.hostUtils"),
        dm = ["*.youtu.be", "*.youtube.com"],
        em = ["googleads.g.doubleclick.net", "pubads.g.doubleclick.net"],
        fm = "ad.doubleclick.net bid.g.doubleclick.net ggpht.com google.co.uk google.com googleads.g.doubleclick.net googleads4.g.doubleclick.net googleadservices.com googlesyndication.com googleusercontent.com gstatic.com gvt1.com prod.google.com pubads.g.doubleclick.net s0.2mdn.net static.doubleclick.net surveys.g.doubleclick.net youtube.com ytimg.com".split(" "),
        gm = ["c.googlesyndication.com"],
        jm = function(a) {
            var b = void 0 === b ? window.location.protocol : b;
            var c = !1;
            hm(a, gm) ? c = !1 : (null == a ? 0 : im(dm, a)) ? c = !0 : "https:" == b && hm(a, fm) && (c = !0);
            if (c) {
                b = new ll(a);
                if ("https" == b.Db) return a;
                ml(b, "https");
                return b.toString()
            }
            return a
        };

    function hm(a, b) {
        return (new RegExp("^https?://([a-z0-9-]{1,63}\\.)*(" + b.join("|").replace(/\./g, "\\.") + ")(:[0-9]+)?([/?#]|$)", "i")).test(a)
    }
    var im = function(a, b) {
        try {
            var c = (new ll(b)).ea;
            c = c.replace(/^www./i, "");
            return a.some(function(a) {
                return km(a, c)
            })
        } catch (d) {
            return cm && cm.log(Ll, "url: " + b + " is not a trusted host.", void 0), !1
        }
    };

    function km(a, b) {
        if (kb(zb(b))) return !1;
        a = a.toLowerCase();
        b = b.toLowerCase();
        return "*." == a.substr(0, 2) ? (a = a.substr(2), a.length > b.length ? !1 : b.substr(-a.length) == a && (b.length == a.length || "." == b.charAt(b.length - a.length - 1))) : a == b
    };
    var lm = function() {
        am.call(this);
        this.Qa = this.km = this.im = this.Za = null
    };
    q(lm, am);
    lm.prototype.getClickThroughUrl = function() {
        return this.sl
    };
    lm.prototype.getMediaUrl = function() {
        return this.jm
    };
    lm.prototype.isSkippable = function() {
        return null != this.Za
    };
    var mm = function(a, b, c) {
            fd(b, function(b, e) {
                !b && 0 !== b || c[e] || (a += "&" + encodeURIComponent(e) + "=" + encodeURIComponent(String(b)), c[e] = !0)
            });
            return a
        },
        qm = function(a, b, c, d, e, f, g, h) {
            f = void 0 === f ? Infinity : f;
            g = void 0 === g ? !1 : g;
            pe.call(this, a, h);
            var k = this;
            this.Bf = 0;
            this.Dj = f;
            this.Lh = b;
            this.ea = c;
            this.$ = d;
            this.Nm = e;
            this.qk = !("csi.gstatic.com" !== this.ea || !this.J.navigator || !this.J.navigator.sendBeacon);
            this.Kb = {};
            this.J.performance && this.J.performance.now || nm(this, "dat", 1);
            this.J.navigator && this.J.navigator.deviceMemory &&
                nm(this, "dmc", this.J.navigator.deviceMemory);
            this.Yj = !g;
            this.sd = y(this.Ff, this);
            this.Ni = Ga(this.J.setTimeout, this.sd, 1100);
            this.Cf = this.J.setTimeout(this.sd, 5E3);
            this.lb = {};
            this.$b = b.length + c.length + d.length + e.length + 3;
            this.zc = 0;
            A(this.jc, function(a) {
                return om(k, a)
            });
            pm(this);
            "complete" === this.J.document.readyState ? this.J.setTimeout(this.sd, 0) : Nd(this.J, "load", this.Ni);
            Nd(this.J, "unload", this.sd)
        };
    q(qm, pe);
    var nm = function(a, b, c) {
        c = String(c);
        a.$b = null != a.Kb[b] ? a.$b + (c.length - a.Kb[b].length) : a.$b + (b.length + c.length + 2);
        a.Kb[b] = c
    };
    qm.prototype.ab = function(a, b) {
        rm(this, a, b, !1)
    };
    var rm = function(a, b, c, d, e) {
        e = void 0 === e ? "" : e;
        var f = null == a.lb[b] ? b.length + c.length + 2 : d ? c.length + e.length : c.length - a.lb[b].length;
        8E3 < a.$b + a.zc + f && (a.Ff(), f = b.length + c.length + 2);
        a.lb[b] = d && null != a.lb[b] ? a.lb[b] + ("" + e + c) : c;
        a.zc += f;
        6E3 <= a.$b + a.zc && a.Ff()
    };
    qm.prototype.Ff = function() {
        if (this.tb && this.Yj) {
            try {
                if (this.zc) {
                    var a = this.lb;
                    this.Bf++;
                    z(2 == this.$.split("?").length);
                    z("=" == this.$[this.$.length - 1]);
                    var b = this.Lh + "//" + this.ea + this.$ + this.Nm,
                        c = {};
                    b = mm(b, this.Kb, c);
                    b = mm(b, a, c);
                    this.J.google_timing_params && (b = mm(b, this.J.google_timing_params, c), this.J.google_timing_params = void 0);
                    var d = b;
                    a = !1;
                    try {
                        a = this.qk && this.J.navigator && this.J.navigator.sendBeacon(d, null)
                    } catch (e) {
                        this.qk = !1
                    }
                    a || Qd(this.J, d);
                    pm(this);
                    this.Bf === this.Dj && this.disable()
                }
            } catch (e) {
                (new xe).Qb(358,
                    e)
            }
            this.lb = {};
            this.zc = 0;
            this.jc.length = 0;
            this.J.clearTimeout(this.Cf);
            this.Cf = 0
        }
    };
    var pm = function(a) {
            nm(a, "puid", (a.Bf + 1).toString(36) + "~" + Ha().toString(36))
        },
        om = function(a, b) {
            var c = "met." + b.type,
                d = w(b.value) ? Math.round(b.value).toString(36) : b.value,
                e = Math.round(b.duration);
            b = "" + b.label + (null != b.slotId ? "_" + b.slotId : "") + ("." + d) + (0 < e ? "_" + e.toString(36) : "");
            rm(a, c, b, !0, "~")
        };
    qm.prototype.yf = function(a) {
        this.tb && this.Bf < this.Dj && (pe.prototype.yf.call(this, a), om(this, a))
    };
    qm.prototype.yg = function() {
        this.Yj = !0;
        this.Ff()
    };
    qm.prototype.disable = function() {
        pe.prototype.disable.call(this);
        this.J.clearTimeout(this.Cf);
        this.zc = this.Cf = 0;
        this.lb = {};
        Od(this.J, "unload", this.sd);
        Od(this.J, "load", this.Ni)
    };
    var W = function() {
        this.H = new qm(1, "https:", "csi.gstatic.com", "/csi?v=2&s=", "ima", void 0, !0);
        this.setParameter("c", tg());
        this.Lm = 0;
        this.G = Tl("imalib.instrumentation.Instrumentation")
    };
    W.prototype.yg = function() {
        this.H.yg()
    };
    var sm = function() {
        W.g().yg()
    };
    W.prototype.ab = function(a, b) {
        null != b && this.H.ab(a, b)
    };
    W.prototype.getParameter = function(a) {
        return this.H.Kb[a]
    };
    W.prototype.setParameter = function(a, b) {
        null != b && nm(this.H, a, b)
    };
    W.prototype.removeParameter = function(a) {
        var b = this.H;
        null != b.Kb[a] && (b.$b -= a.length + b.Kb[a].length + 2, delete b.Kb[a])
    };
    var tm = function(a) {
        var b = W.g(),
            c = b.H;
        b = je() - b.Lm;
        c.tb && c.yf(new le(a, 4, b, 0, void 0))
    };
    za(W);
    var um = function(a) {
            var b = void 0 === b ? new Map : b;
            b.set("AD_MT", new Xl("AD_MT", {
                toString: function() {
                    return Math.round(Math.max(0, 1E3 * a.getCurrentTime())).toString()
                }
            }));
            b.set("TIMESTAMP", new Xl("TIMESTAMP", {
                toString: function() {
                    return (new Date).toISOString()
                }
            }));
            return b
        },
        vm = function(a, b) {
            b = void 0 === b ? new Map : b;
            b.set("ERRORCODE", new Xl("ERRORCODE", a));
            return b
        };
    var wm = /(?:\[|%5B)([a-zA-Z0-9_]+)(?:\]|%5D)/g,
        xm = function(a, b) {
            var c = Tl("UrlMacrosReplacer");
            return a.replace(wm, function(d, e) {
                var f = b.get(e);
                if (null == f) return Vl(c, "No macro definition found for: " + e), d;
                if (null == f.nk) var g = !0;
                else try {
                    g = f.nk(a) || !1
                } catch (k) {
                    g = !1
                }
                if (g) {
                    b: {
                        try {
                            var h = f.Bl.toString();
                            break b
                        } catch (k) {
                            Ul(f.G, "Failed to calculate macro: " + f.Wd)
                        }
                        h = null
                    }
                    e = h;e = null == e || "" != e && kb(zb(e)) ? null : encodeURIComponent(e).replace(/%2C/g, ",")
                }
                else e = null;
                return null != e ? e : d
            })
        };
    var ym = function(a) {
            this.en = a;
            this.em = Tl("UrlReporter")
        },
        zm = function(a, b) {
            return a.map(function(a) {
                return xm(a, b)
            })
        },
        Bm = function(a, b, c) {
            b = c ? zm(b, c) : b;
            Am(a.en, b)
        };
    var Cm = function(a, b) {
        ym.call(this, b);
        this.eg = a;
        this.Vi = new Set;
        this.mh = new Map;
        this.Bj = [];
        this.hh = this.ih = -1
    };
    q(Cm, ym);
    Cm.prototype.Oa = function(a, b) {
        b = void 0 === b ? Dm(this, a) : b;
        a: switch (a) {
            case "mute":
            case "unmute":
            case "pause":
            case "resume":
            case "fullscreen":
            case "progress":
            case "error":
                var c = !0;
                break a;
            default:
                c = !this.Vi.has(a)
        }!c || 0 >= b.length || (this.Bj.forEach(function(b) {
            try {
                b(a)
            } catch (e) {}
        }), Vl(this.em, "Reporting urls for event : " + a), this.Vi.add(a), Bm(this, b, this.mh))
    };
    var Em = function(a, b) {
            var c = a.eg.M.get("progress");
            if (!(null == c || 0 >= c.length)) {
                var d = [],
                    e = a.ih,
                    f = a.hh;
                c.forEach(function(c) {
                    var g = c.rm,
                        k = c.qm;
                    k && k <= 1E5 * b / a.eg.duration && k > a.hh ? (f = k > f ? k : f, d.push(c.Jd())) : g && g <= b && g > a.ih && (e = g > e ? g : e, d.push(c.Jd()))
                });
                a.ih = e;
                a.hh = f;
                a.Oa("progress", d)
            }
        },
        Fm = function(a, b) {
            tm("err");
            W.g().ab("aec", String(b));
            vm(b, a.mh);
            a.Oa("error")
        },
        Gm = function(a, b) {
            a.mh.set(b.getName(), b)
        },
        Hm = function(a, b) {
            b.forEach(function(b) {
                return Gm(a, b)
            })
        },
        Im = function(a, b) {
            a.Bj.push(b)
        },
        Dm = function(a,
            b) {
            return (a.eg.M.get(b) || []).map(function(a) {
                return a.Jd()
            })
        };
    var Jm = {},
        Km = (Jm.MOAT_INIT = ["://yts\\.moatads\\.com", "://yts-testing\\.moatads\\.com", "://pagead2\\.googlesyndication\\.com/pagead/gen_204"], Jm.MOAT_VIEWABILITY = ["://[^.]*.moatads.com", "://pagead2.googlesyndication.com/pagead/gen_204", "://pubads.g.doubleclick.net"], Jm.IAS_VIEWABILITY = ["://[^.]*.adsafeprotected.com", "://[^.]*.test-adsafeprotected.com", "://pagead2.googlesyndication.com/pagead/gen_204", "://pubads.g.doubleclick.net"], Jm.DV_VIEWABILITY = ["://[^.]*.yt.srs.doubleverify.com", "://pagead2.googlesyndication.com/pagead/gen_204",
            "://pubads.g.doubleclick.net"
        ], Jm.GOOGLE_VIEWABILITY = "://pubads.g.doubleclick.net ://googleads.g.doubleclick.net ://ad[.-]([a-z0-9]+.){0,1}doubleclick.net ://ade\\.googlesyndication\\.com ://pagead2.googlesyndication.com ://([a-z0-9]+[.])*youtube.com".split(" "), Jm),
        Lm = new Map,
        Nm = function(a, b, c) {
            c = void 0 === c ? !1 : c;
            hh.call(this);
            var d = this;
            this.Mh = String(Math.floor(1E9 * Math.random()));
            this.oa = a;
            this.D = b;
            this.Zk = c;
            this.xe = new xd;
            Im(this.oa, function(a) {
                a = el(a, d.Mh, {
                    opt_fullscreen: !1,
                    opt_adElement: d.D.N ||
                        void 0
                });
                Mm(d, a)
            });
            Lm.set(this.Mh, this)
        };
    q(Nm, hh);
    Nm.prototype.yb = function() {
        return {
            currentTime: this.D.getCurrentTime(),
            duration: this.D.getDuration(),
            eo: !1,
            volume: this.D.getVolume()
        }
    };
    Nm.prototype.na = function(a) {
        this.oa.Oa(a)
    };
    var Mm = function(a, b) {
            Gm(a.oa, new Xl("VIEWABILITY", b.viewability));
            var c = function(a) {
                return function(b) {
                    return Om(b, a)
                }
            };
            Gm(a.oa, new Xl("DV_VIEWABILITY", b.doubleVerifyViewability, c("DV_VIEWABILITY")));
            Gm(a.oa, new Xl("GOOGLE_VIEWABILITY", b.googleViewability, c("GOOGLE_VIEWABILITY")));
            Gm(a.oa, new Xl("IAS_VIEWABILITY", b.integralAdsViewability, c("IAS_VIEWABILITY")));
            Gm(a.oa, new Xl("MOAT_INIT", b.moatInit, c("MOAT_INIT")));
            Gm(a.oa, new Xl("MOAT_VIEWABILITY", b.moatViewability, c("MOAT_VIEWABILITY")))
        },
        Om = function(a,
            b) {
            b = Km[b];
            return null == b ? !0 : b.some(function(b) {
                return null != a.match(b)
            })
        };
    Nm.prototype.Ca = function() {
        Lm["delete"](this.Mh);
        this.D = this.oa = null;
        this.xe = new xd
    };
    Ia("ima.common.triggerExternalActivityEvent", function(a, b, c) {
        (a = Lm.get(a)) && a.na(c)
    });
    Ia("ima.common.getVideoMetadata", function(a) {
        return (a = Lm.get(a)) ? a.yb() : {}
    });
    var Pm = function() {
        this.adTagUrl = null;
        this.re = "unknown";
        this.vastLoadTimeout = 5E3;
        this.ni = !1;
        this.linearAdSlotHeight = this.linearAdSlotWidth = null;
        this.slotId = Math.floor(2147483646 * Math.random()) + 1
    };
    Pm.prototype.clone = function() {
        var a = new Pm;
        "auto" == this.re ? a.re = "auto" : "click" == this.re && (a.re = "click");
        a.adTagUrl = this.adTagUrl;
        a.adsResponse = this.adsResponse;
        a.ni = this.ni;
        a.vastLoadTimeout = this.vastLoadTimeout;
        a.linearAdSlotWidth = this.linearAdSlotWidth;
        a.linearAdSlotHeight = this.linearAdSlotHeight;
        return a
    };
    var Qm = function(a, b) {
        this.url = a;
        this.id = void 0 === b ? null : b
    };
    var Rm = function(a, b, c) {
        this.url = a;
        this.resourceType = b;
        this.creativeType = void 0 === c ? null : c
    };
    var Sm = function(a) {
        a = void 0 === a ? {} : a;
        var b = void 0 === a.cg ? null : a.cg,
            c = void 0 === a.ia ? null : a.ia,
            d = void 0 === a.width ? null : a.width,
            e = void 0 === a.height ? null : a.height,
            f = void 0 === a.rg ? null : a.rg,
            g = void 0 === a.sg ? [] : a.sg,
            h = void 0 === a.Xa ? [] : a.Xa,
            k = void 0 === a.M ? [] : a.M;
        this.id = void 0 === a.id ? null : a.id;
        this.cg = b;
        this.ia = c;
        this.width = d;
        this.height = e;
        this.rg = f;
        this.sg = g;
        this.Xa = h;
        this.M = k
    };
    var Tm = function(a) {
        this.required = void 0 === a ? "none" : a
    };
    var Um = function(a) {
        a = void 0 === a ? {} : a;
        var b = void 0 === a.He ? [] : a.He,
            c = void 0 === a.Me ? [] : a.Me;
        this.td = void 0 === a.td ? null : a.td;
        this.He = b;
        this.Me = c
    };
    var Vm = function(a) {
        a = void 0 === a ? {} : a;
        var b = void 0 === a.ia ? null : a.ia,
            c = void 0 === a.wi ? null : a.wi,
            d = void 0 === a.xi ? null : a.xi,
            e = void 0 === a.width ? null : a.width,
            f = void 0 === a.height ? null : a.height,
            g = void 0 === a.offset ? null : a.offset,
            h = void 0 === a.duration ? null : a.duration,
            k = void 0 === a.Sg ? null : a.Sg,
            m = void 0 === a.Ye ? [] : a.Ye,
            n = void 0 === a.Xa ? [] : a.Xa;
        this.Kh = void 0 === a.Kh ? null : a.Kh;
        this.ia = b;
        this.wi = c;
        this.xi = d;
        this.width = e;
        this.height = f;
        this.offset = g;
        this.duration = h;
        this.Sg = k;
        this.Ye = m;
        this.Xa = n
    };
    var Wm = function(a, b) {
        var c = void 0 === b ? {} : b;
        b = void 0 === c.height ? null : c.height;
        var d = void 0 === c.width ? null : c.width,
            e = void 0 === c.ug ? null : c.ug,
            f = void 0 === c.mimeType ? null : c.mimeType,
            g = void 0 === c.ia ? null : c.ia,
            h = void 0 === c.bitrate ? null : c.bitrate,
            k = void 0 === c.Ka ? null : c.Ka,
            m = void 0 === c.maxBitrate ? null : c.maxBitrate;
        c = void 0 === c.pe ? null : c.pe;
        this.url = a;
        this.height = b;
        this.width = d;
        this.ug = e;
        this.mimeType = f;
        this.ia = g;
        this.Ka = k || m || h || 0;
        this.maxBitrate = m || m || h || 0;
        this.pe = c
    };
    var Xm = function(a) {
        a = void 0 === a ? {} : a;
        var b = void 0 === a.Za ? null : a.Za,
            c = void 0 === a.M ? [] : a.M,
            d = void 0 === a.dd ? [] : a.dd,
            e = void 0 === a.Sf ? null : a.Sf,
            f = void 0 === a.Qa ? null : a.Qa,
            g = void 0 === a.Tg ? [] : a.Tg;
        this.duration = void 0 === a.duration ? null : a.duration;
        this.Qa = f;
        this.Za = b;
        this.M = c;
        this.dd = d;
        this.Sf = e;
        this.Tg = g
    };
    var Ym = function(a) {
        a = void 0 === a ? {} : a;
        var b = void 0 === a.ia ? null : a.ia,
            c = void 0 === a.height ? null : a.height,
            d = void 0 === a.width ? null : a.width,
            e = void 0 === a.qh ? null : a.qh,
            f = void 0 === a.Xa ? [] : a.Xa,
            g = void 0 === a.xh ? null : a.xh,
            h = void 0 === a.yh ? [] : a.yh,
            k = void 0 === a.Qa ? null : a.Qa;
        this.id = void 0 === a.id ? null : a.id;
        this.ia = b;
        this.height = c;
        this.width = d;
        this.qh = e;
        this.Xa = f;
        this.xh = g;
        this.yh = h;
        this.Qa = k
    };
    var Zm = function(a) {
        this.M = a = void 0 === a ? [] : a
    };
    var $m = function(a) {
        a = void 0 === a ? {} : a;
        var b = void 0 === a.Ug ? "unknown" : a.Ug;
        this.Vg = (void 0 === a.Vg ? "unknown" : a.Vg) || "unknown";
        this.Ug = b || "unknown"
    };
    var an = function(a) {
        a = void 0 === a ? {} : a;
        var b = void 0 === a.id ? null : a.id,
            c = void 0 === a.adId ? null : a.adId,
            d = void 0 === a.tc ? null : a.tc,
            e = void 0 === a.wh ? null : a.wh,
            f = void 0 === a.qg ? null : a.qg,
            g = void 0 === a.hi ? null : a.hi;
        this.sequence = void 0 === a.sequence ? null : a.sequence;
        this.id = b;
        this.adId = c;
        this.tc = d;
        this.wh = e;
        this.qg = f;
        this.hi = g
    };
    var bn = function(a) {
        a = void 0 === a ? {} : a;
        var b = void 0 === a.Ef ? null : a.Ef,
            c = void 0 === a.Th ? null : a.Th,
            d = void 0 === a.parameters ? null : a.parameters,
            e = void 0 === a.M ? [] : a.M;
        this.vendor = void 0 === a.vendor ? null : a.vendor;
        this.Ef = b;
        this.Th = c;
        this.parameters = d;
        this.M = e
    };
    var cn = function(a) {
        a = void 0 === a ? {} : a;
        var b = void 0 === a.vb ? [] : a.vb,
            c = void 0 === a.zb ? [] : a.zb,
            d = void 0 === a.xa ? [] : a.xa,
            e = void 0 === a.nb ? [] : a.nb,
            f = void 0 === a.ka ? [] : a.ka;
        this.Aa = void 0 === a.Aa ? null : a.Aa;
        this.Ti = b;
        this.Sl = c;
        this.xa = d;
        this.nb = e;
        this.ka = f
    };
    var dn = function(a, b) {
        var c = void 0 === b ? {} : b;
        b = void 0 === c.id ? null : c.id;
        c = void 0 === c.sequence ? null : c.sequence;
        this.aa = a;
        this.id = b;
        this.sequence = c
    };
    var en = function() {
        var a;
        this.U = a = void 0 === a ? [] : a
    };
    en.prototype.unshift = function(a) {
        this.U.unshift(a)
    };
    var fn = function(a, b) {
        var c = [];
        a.U.forEach(function(a) {
            c = c.concat(a.aa.ka.filter(function(a) {
                return a instanceof b
            }))
        });
        return c
    };
    var gn = function(a) {
        a = void 0 === a ? {} : a;
        var b = void 0 === a.Kc ? null : a.Kc,
            c = void 0 === a.fg ? null : a.fg,
            d = void 0 === a.description ? null : a.description,
            e = void 0 === a.ai ? null : a.ai;
        cn.call(this, {
            Aa: void 0 === a.Aa ? null : a.Aa,
            vb: void 0 === a.vb ? [] : a.vb,
            zb: void 0 === a.zb ? [] : a.zb,
            xa: void 0 === a.xa ? [] : a.xa,
            nb: void 0 === a.nb ? [] : a.nb,
            ka: void 0 === a.ka ? [] : a.ka
        });
        this.Kc = b;
        this.fg = c;
        this.description = d;
        this.ai = e
    };
    q(gn, cn);
    var hn = function() {};
    hn.prototype.mk = function() {
        return !0
    };
    hn.prototype.Je = function(a) {
        var b = new am;
        this.uf(a, b);
        return b
    };
    hn.prototype.uf = function(a, b) {
        a.U.forEach(function(a) {
            jn(a, b);
            a.aa.Aa && b.adSystems.push(a.aa.Aa)
        });
        0 < a.U.length && (a = a.U[0], a.id && (b.id = a.id), a.aa instanceof gn && (b.Kc = a.aa.Kc))
    };
    var jn = function(a, b) {
        var c = a.aa.Sl;
        a.aa.Ti.forEach(function(a) {
            bm(b, new Zl("error", a))
        });
        c.forEach(function(a) {
            bm(b, new Zl("impression", a))
        })
    };
    var kn = function(a) {
        this.kl = a
    };
    kn.prototype.getAds = function() {
        return this.kl
    };
    var ln = function(a, b) {
        var c = Error.call(this);
        this.message = c.message;
        "stack" in c && (this.stack = c.stack);
        this.message = a;
        this.zl = void 0 === b ? 900 : b
    };
    q(ln, Error);
    var mn = function() {
            this.wl = !1
        },
        Am = function(a, b) {
            b.forEach(function(b) {
                try {
                    b = jm(b), Gl(b, a.wl)
                } catch (d) {}
            })
        };
    var nn = function(a, b, c) {
        this.id = a;
        this.W = b;
        this.Hg = c;
        this.ge = !1
    };
    nn.prototype.select = function() {
        this.ge = !0
    };
    var on = function() {
            this.Xi = []
        },
        pn = function() {
            this.gg = new Map;
            this.pj = !1;
            this.Mi = new on;
            this.Hh = new nn(0, 0, !1);
            this.kh = [this.Mi]
        },
        X = function(a) {
            var b = qn;
            if (b.pj) return Pa("Cannot register Experiments after selection."), b.Hh;
            if (b.gg.has(a.id)) return Pa("Cannot define multiple experiments with Id: " + a.id + "."), b.Hh;
            if (null == a.W && null == a.control) return Pa('Experiment Mods must be defined with the name "mods" or a control must be specified with the name "control".'), b.Hh;
            var c = b.Mi;
            if (null != a.control)
                for (var d =
                        p(b.kh), e = d.next(); !e.done; e = d.next()) {
                    if (e = e.value, e.Xi.includes(a.control)) {
                        c = e;
                        break
                    }
                } else null != a.Yl && (c = a.Yl);
            d = 0;
            null != a.control ? d = a.control.W : null != a.W && (d = a.W);
            a = new nn(a.id, d, !!a.Sc);
            c.Xi.push(a);
            b.kh.includes(c) || b.kh.push(c);
            b.gg.set(a.id, a);
            return a
        };
    pn.prototype.reset = function() {
        for (var a = p(this.gg), b = a.next(); !b.done; b = a.next()) b = p(b.value), b.next(), b.next().value.ge = !1;
        this.pj = !1
    };
    var qn = new pn;
    var rn = X({
            id: 418572103,
            W: 0,
            Sc: !1
        }),
        sn = X({
            id: 418572104,
            W: 0,
            Sc: !1
        }),
        tn = X({
            id: 418572109,
            W: 50,
            Sc: !1
        });
    X({
        id: 324123060,
        W: 10,
        Sc: !1
    });
    X({
        id: 324123061,
        W: 10,
        Sc: !1
    });
    X({
        id: 324123062,
        W: 10,
        Sc: !1
    });
    X({
        id: 324123063,
        W: 10
    });
    X({
        id: 420706097,
        W: 10
    });
    X({
        id: 420706098,
        W: 10
    });
    X({
        id: 21061786,
        W: 10
    });
    X({
        id: 21061817,
        W: 10
    });
    X({
        id: 21061824,
        W: 10
    });
    X({
        id: 21061888,
        W: 10
    });
    X({
        id: 21061932,
        W: 10
    });
    X({
        id: 21061934,
        W: 10
    });
    X({
        id: 21061893,
        W: 10
    });
    var un = function() {};
    un.prototype.Xh = function() {
        return !1
    };
    un.prototype.ng = function() {
        return null
    };
    var vn = function() {};
    q(vn, un);
    vn.prototype.Xh = function() {
        return !1
    };
    vn.prototype.ng = function(a) {
        return a.adTagUrl
    };
    var wn = function() {
        this.$j = []
    };
    wn.prototype.Nh = function(a) {
        null != a && this.$j.push(a)
    };
    var xn = function(a) {
        this.Vm = a;
        this.tk = Ha()
    };
    xn.prototype.reset = function() {
        this.tk = Ha()
    };
    var yn = function(a) {
        var b = Ha();
        a = a.tk + a.Vm - b;
        return 0 < a ? a : 0
    };
    var zn = function() {
            if (!C) return !1;
            try {
                return new ActiveXObject("MSXML2.DOMDocument"), !0
            } catch (a) {
                return !1
            }
        },
        An = C && zn(),
        Bn = function(a) {
            if ("undefined" != typeof DOMParser) return (new DOMParser).parseFromString(a, "application/xml");
            if (An) {
                var b = new ActiveXObject("MSXML2.DOMDocument");
                b.resolveExternals = !1;
                b.validateOnParse = !1;
                try {
                    b.setProperty("ProhibitDTD", !0), b.setProperty("MaxXMLSize", 2048), b.setProperty("MaxElementDepth", 256)
                } catch (c) {}
                b.loadXML(a);
                return b
            }
            throw Error("Your browser does not support loading xml documents");
        };
    var Cn = function(a) {
        hh.call(this);
        this.Qg = a;
        this.C = {}
    };
    Ja(Cn, hh);
    var Dn = [];
    Cn.prototype.ma = function(a, b, c, d) {
        Ba(b) || (b && (Dn[0] = b.toString()), b = Dn);
        for (var e = 0; e < b.length; e++) {
            var f = Bh(a, b[e], c || this.handleEvent, d || !1, this.Qg || this);
            if (!f) break;
            this.C[f.key] = f
        }
        return this
    };
    Cn.prototype.Aj = function(a, b, c, d) {
        return En(this, a, b, c, d)
    };
    var Fn = function(a, b, c, d, e) {
            En(a, b, c, d, !1, e)
        },
        En = function(a, b, c, d, e, f) {
            if (Ba(c))
                for (var g = 0; g < c.length; g++) En(a, b, c[g], d, e, f);
            else {
                b = Ah(b, c, d || a.handleEvent, e, f || a.Qg || a);
                if (!b) return a;
                a.C[b.key] = b
            }
            return a
        };
    Cn.prototype.ii = function(a, b, c, d, e) {
        if (Ba(b))
            for (var f = 0; f < b.length; f++) this.ii(a, b[f], c, d, e);
        else c = c || this.handleEvent, d = Da(d) ? !!d.capture : !!d, e = e || this.Qg || this, c = Ch(c), d = !!d, b = qh(a) ? a.Id(b, c, d, e) : a ? (a = Eh(a)) ? a.Id(b, c, d, e) : null : null, b && (Jh(b), delete this.C[b.key])
    };
    Cn.prototype.Oh = function() {
        Ib(this.C, function(a, b) {
            this.C.hasOwnProperty(b) && Jh(a)
        }, this);
        this.C = {}
    };
    Cn.prototype.Ca = function() {
        Cn.Ec.Ca.call(this);
        this.Oh()
    };
    Cn.prototype.handleEvent = function() {
        throw Error("EventHandler.handleEvent not implemented");
    };
    var Gn = function(a) {
        switch (a) {
            case 0:
                return "No Error";
            case 1:
                return "Access denied to content document";
            case 2:
                return "File not found";
            case 3:
                return "Firefox silently errored";
            case 4:
                return "Application custom error";
            case 5:
                return "An exception occurred";
            case 6:
                return "Http response at 400 or 500 level";
            case 7:
                return "Request was aborted";
            case 8:
                return "Request timed out";
            case 9:
                return "The resource is not available offline";
            default:
                return "Unrecognized error code"
        }
    };
    var Hn = function() {};
    Hn.prototype.Ii = null;
    Hn.prototype.getOptions = function() {
        var a;
        (a = this.Ii) || (a = {}, In(this) && (a[0] = !0, a[1] = !0), a = this.Ii = a);
        return a
    };
    var Jn, Kn = function() {};
    Ja(Kn, Hn);
    Kn.prototype.xd = function() {
        var a = In(this);
        return a ? new ActiveXObject(a) : new XMLHttpRequest
    };
    var In = function(a) {
        if (!a.qj && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                var d = b[c];
                try {
                    return new ActiveXObject(d), a.qj = d
                } catch (e) {}
            }
            throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
        }
        return a.qj
    };
    Jn = new Kn;
    var Ln = function(a) {
        Q.call(this);
        this.headers = new fl;
        this.bg = a || null;
        this.Fb = !1;
        this.ag = this.h = null;
        this.xj = this.jf = "";
        this.cd = 0;
        this.Od = "";
        this.pc = this.Wg = this.Ze = this.zg = !1;
        this.md = 0;
        this.Kf = null;
        this.ck = "";
        this.Qf = this.Km = this.vi = !1
    };
    Ja(Ln, Q);
    Ln.prototype.G = Tl("goog.net.XhrIo");
    var Mn = /^https?$/i,
        Nn = ["POST", "PUT"],
        On = function(a, b) {
            a.md = Math.max(0, b)
        };
    Ln.prototype.send = function(a, b, c, d) {
        if (this.h) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.jf + "; newUri=" + a);
        b = b ? b.toUpperCase() : "GET";
        this.jf = a;
        this.Od = "";
        this.cd = 0;
        this.xj = b;
        this.zg = !1;
        this.Fb = !0;
        this.h = this.bg ? this.bg.xd() : Jn.xd();
        this.ag = this.bg ? this.bg.getOptions() : Jn.getOptions();
        this.h.onreadystatechange = y(this.Pj, this);
        this.Km && "onprogress" in this.h && (this.h.onprogress = y(function(a) {
            this.Oj(a, !0)
        }, this), this.h.upload && (this.h.upload.onprogress = y(this.Oj, this)));
        try {
            Wl(this.G, Pn(this, "Opening Xhr")), this.Wg = !0, this.h.open(b, String(a), !0), this.Wg = !1
        } catch (f) {
            Wl(this.G, Pn(this, "Error opening Xhr: " + f.message));
            Qn(this, f);
            return
        }
        a = c || "";
        var e = this.headers.clone();
        d && kl(d, function(a, b) {
            e.set(b, a)
        });
        d = bb(e.xb(), Rn);
        c = r.FormData && a instanceof r.FormData;
        !(0 <= Ua(Nn, b)) || d || c || e.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        e.forEach(function(a, b) {
            this.h.setRequestHeader(b, a)
        }, this);
        this.ck && (this.h.responseType = this.ck);
        "withCredentials" in
        this.h && this.h.withCredentials !== this.vi && (this.h.withCredentials = this.vi);
        try {
            Sn(this), 0 < this.md && (this.Qf = Tn(this.h), Wl(this.G, Pn(this, "Will abort after " + this.md + "ms if incomplete, xhr2 " + this.Qf)), this.Qf ? (this.h.timeout = this.md, this.h.ontimeout = y(this.nd, this)) : this.Kf = xi(this.nd, this.md, this)), Wl(this.G, Pn(this, "Sending request")), this.Ze = !0, this.h.send(a), this.Ze = !1
        } catch (f) {
            Wl(this.G, Pn(this, "Send error: " + f.message)), Qn(this, f)
        }
    };
    var Tn = function(a) {
            return C && lc(9) && w(a.timeout) && u(a.ontimeout)
        },
        Rn = function(a) {
            return "content-type" == a.toLowerCase()
        };
    Ln.prototype.nd = function() {
        "undefined" != typeof ta && this.h && (this.Od = "Timed out after " + this.md + "ms, aborting", this.cd = 8, Wl(this.G, Pn(this, this.Od)), this.dispatchEvent("timeout"), this.abort(8))
    };
    var Qn = function(a, b) {
            a.Fb = !1;
            a.h && (a.pc = !0, a.h.abort(), a.pc = !1);
            a.Od = b;
            a.cd = 5;
            Un(a);
            Vn(a)
        },
        Un = function(a) {
            a.zg || (a.zg = !0, a.dispatchEvent("complete"), a.dispatchEvent("error"))
        };
    Ln.prototype.abort = function(a) {
        this.h && this.Fb && (Wl(this.G, Pn(this, "Aborting")), this.Fb = !1, this.pc = !0, this.h.abort(), this.pc = !1, this.cd = a || 7, this.dispatchEvent("complete"), this.dispatchEvent("abort"), Vn(this))
    };
    Ln.prototype.Ca = function() {
        this.h && (this.Fb && (this.Fb = !1, this.pc = !0, this.h.abort(), this.pc = !1), Vn(this, !0));
        Ln.Ec.Ca.call(this)
    };
    Ln.prototype.Pj = function() {
        this.Da || (this.Wg || this.Ze || this.pc ? Wn(this) : this.zm())
    };
    Ln.prototype.zm = function() {
        Wn(this)
    };
    var Wn = function(a) {
        if (a.Fb && "undefined" != typeof ta)
            if (a.ag[1] && 4 == Xn(a) && 2 == Yn(a)) Wl(a.G, Pn(a, "Local request error detected and ignored"));
            else if (a.Ze && 4 == Xn(a)) xi(a.Pj, 0, a);
        else if (a.dispatchEvent("readystatechange"), 4 == Xn(a)) {
            Wl(a.G, Pn(a, "Request complete"));
            a.Fb = !1;
            try {
                var b = Yn(a);
                a: switch (b) {
                    case 200:
                    case 201:
                    case 202:
                    case 204:
                    case 206:
                    case 304:
                    case 1223:
                        var c = !0;
                        break a;
                    default:
                        c = !1
                }
                var d;
                if (!(d = c)) {
                    var e;
                    if (e = 0 === b) {
                        var f = String(a.jf).match(Vd)[1] || null;
                        if (!f && r.self && r.self.location) {
                            var g =
                                r.self.location.protocol;
                            f = g.substr(0, g.length - 1)
                        }
                        e = !Mn.test(f ? f.toLowerCase() : "")
                    }
                    d = e
                }
                if (d) a.dispatchEvent("complete"), a.dispatchEvent("success");
                else {
                    a.cd = 6;
                    try {
                        var h = 2 < Xn(a) ? a.h.statusText : ""
                    } catch (k) {
                        Wl(a.G, "Can not get status: " + k.message), h = ""
                    }
                    a.Od = h + " [" + Yn(a) + "]";
                    Un(a)
                }
            } finally {
                Vn(a)
            }
        }
    };
    Ln.prototype.Oj = function(a, b) {
        z("progress" === a.type, "goog.net.EventType.PROGRESS is of the same type as raw XHR progress.");
        this.dispatchEvent(Zn(a, "progress"));
        this.dispatchEvent(Zn(a, b ? "downloadprogress" : "uploadprogress"))
    };
    var Zn = function(a, b) {
            return {
                type: b,
                lengthComputable: a.lengthComputable,
                loaded: a.loaded,
                total: a.total
            }
        },
        Vn = function(a, b) {
            if (a.h) {
                Sn(a);
                var c = a.h,
                    d = a.ag[0] ? ya : null;
                a.h = null;
                a.ag = null;
                b || a.dispatchEvent("ready");
                try {
                    c.onreadystatechange = d
                } catch (e) {
                    (a = a.G) && a.log(Ll, "Problem encountered resetting onreadystatechange: " + e.message, void 0)
                }
            }
        },
        Sn = function(a) {
            a.h && a.Qf && (a.h.ontimeout = null);
            a.Kf && (r.clearTimeout(a.Kf), a.Kf = null)
        },
        Xn = function(a) {
            return a.h ? a.h.readyState : 0
        },
        Yn = function(a) {
            try {
                return 2 < Xn(a) ?
                    a.h.status : -1
            } catch (b) {
                return -1
            }
        };
    Ln.prototype.getResponseHeader = function(a) {
        if (this.h && 4 == Xn(this)) return a = this.h.getResponseHeader(a), null === a ? void 0 : a
    };
    Ln.prototype.getAllResponseHeaders = function() {
        return this.h && 4 == Xn(this) ? this.h.getAllResponseHeaders() || "" : ""
    };
    var Pn = function(a, b) {
        return b + " [" + a.xj + " " + a.jf + " " + Yn(a) + "]"
    };
    var $n = function() {
            this.G = Tl("UrlLoader")
        },
        bo = function(a, b, c, d) {
            var e = (void 0 === d ? 0 : d) && im(em, b) ? "POST" : "GET";
            return ao(a, b, !0, c, e).then(function(a) {
                return hi(a)
            }, function(d) {
                return 6 == d.message ? (Vl(a.G, "LIMA: Failed! retrying without credentials"), ao(a, b, !1, c, e)) : ii(d)
            })
        },
        ao = function(a, b, c, d, e) {
            var f = new Ln;
            f.vi = c;
            On(f, yn(d));
            var g = new Cn;
            if ("POST" == e) {
                c = new ll(b);
                var h = c.Na.toString();
                ol(c, "");
                b = c.toString()
            }
            return new di(function(c, d) {
                Fn(g, f, "success", function() {
                    try {
                        var a = f.h ? f.h.responseXML : null
                    } catch (Z) {
                        Wl(f.G,
                            "Can not get responseXML: " + Z.message), a = null
                    }
                    if (null == a) {
                        try {
                            var b = f.h ? f.h.responseText : ""
                        } catch (Z) {
                            Wl(f.G, "Can not get responseText: " + Z.message), b = ""
                        }
                        a = Bn(b)
                    }
                    c(a);
                    g.Ba();
                    f.Ba()
                }, a);
                Fn(g, f, ["error", "timeout"], function() {
                    d(Error(f.cd));
                    g.Ba();
                    f.Ba()
                }, a);
                f.send(jm(b), e, h)
            }, a)
        };
    var co = function() {
        var a;
        this.cn = a = void 0 === a ? new $n : a;
        this.Zj = new wn;
        this.nd = null;
        this.G = Tl("AdXmlFetcher")
    };
    co.prototype.setTimeout = function(a) {
        this.nd = a
    };
    co.prototype.Nh = function(a) {
        this.Zj.Nh(a)
    };
    co.prototype.fetch = function(a) {
        if (eo(a)) {
            if (null == a.adsResponse || !eo(a)) throw new ln("The provided VAST response was not found.", 1009);
            if (a.adsResponse instanceof Document) var b = a.adsResponse;
            else try {
                b = Bn(lb(a.adsResponse))
            } catch (f) {
                throw new ln("The provided VAST response is not valid XML.", 100);
            }
            if (null == b) throw new ln("The provided VAST response was not found.", 1009);
            a = hi(b)
        } else {
            null != this.nd ? b = this.nd : (b = new xn(a.vastLoadTimeout), this.setTimeout(b));
            var c;
            if (c = null != a.adTagUrl) b: {
                try {
                    decodeURIComponent(a.adTagUrl.replace(/\+/g,
                        " "))
                } catch (f) {
                    c = !1;
                    break b
                }
                c = !0
            }
            if (c) {
                b: {
                    c = a.adTagUrl;
                    for (var d = p(this.Zj.$j), e = d.next(); !e.done; e = d.next())
                        if (e = e.value, e.Xh(c)) {
                            c = e;
                            break b
                        }
                    c = new vn
                }
                if (tn.ge || tn.Hg)
                    if (d = a.adTagUrl) e = new ll(d), d = encodeURIComponent(String(e.ea)), e = encodeURIComponent(String(e.$)), W.g().ab("dmn", d), W.g().ab("pth", e), sm();c = c.ng(a);a = null == c ? ii(new ln("Failed to build provided ad tag.", 1013)) : fo(this, c, b, a.ni)
            }
            else a = ii(new ln("Invalid fetch from an empty ad tag.", 1013))
        }
        return a
    };
    var fo = function(a, b, c, d) {
            return ni(bo(a.cn, b, c, d), function(b) {
                Vl(a.G, "Failed to load ad request URL. Error: " + b.message);
                return ii(6 == b.message ? new ln(Gn(6), 1012) : 8 == b.message ? new ln(Gn(8), 301) : new ln("Failed to request ads.", 1005))
            })
        },
        eo = function(a) {
            return v(a.adsResponse) && !kb(a.adsResponse) || a.adsResponse instanceof Document
        };
    var go = function(a) {
        this.U = a = void 0 === a ? [] : a
    };
    var ho = function(a) {
        a = void 0 === a ? {} : a;
        var b = void 0 === a.Re ? !0 : a.Re,
            c = void 0 === a.hg ? !1 : a.hg,
            d = void 0 === a.Eg ? !1 : a.Eg,
            e = void 0 === a.ze ? null : a.ze;
        cn.call(this, {
            Aa: void 0 === a.Aa ? null : a.Aa,
            vb: void 0 === a.vb ? [] : a.vb,
            zb: void 0 === a.zb ? [] : a.zb,
            xa: void 0 === a.xa ? [] : a.xa,
            nb: void 0 === a.nb ? [] : a.nb,
            ka: void 0 === a.ka ? [] : a.ka
        });
        this.Re = b;
        this.hg = c;
        this.Eg = d;
        this.ze = e
    };
    q(ho, cn);
    var io = function(a, b) {
            a = parseInt(a.getAttribute(b), 10);
            if (!isNaN(a)) return a
        },
        Y = function(a) {
            if (0 == a.childNodes.length) return null;
            var b = "";
            a = p(a.childNodes);
            for (var c = a.next(); !c.done; c = a.next()) switch (c = c.value, c.nodeType) {
                case 4:
                case 3:
                    b += c.nodeValue
            }
            return b.trim()
        },
        jo = function(a) {
            var b = (a || "").split(":");
            if (3 == b.length) {
                a = parseInt(b[0], 10);
                var c = parseInt(b[1], 10),
                    d = b[2].split("."),
                    e = parseInt(d[0], 10);
                b = 0;
                2 == d.length && (b = parseInt(d[1], 10));
                if (!(isNaN(a) || isNaN(c) || isNaN(e) || isNaN(b))) return a = 36E5 *
                    a + 6E4 * c + 1E3 * e, a += b
            }
        },
        lo = function(a) {
            var b = [];
            a = p(F(a));
            for (var c = a.next(); !c.done; c = a.next()) {
                var d = c.value;
                if ("Verification" == d.nodeName) {
                    c = {
                        vendor: d.getAttribute("vendor"),
                        M: []
                    };
                    d = p(F(d));
                    for (var e = d.next(); !e.done; e = d.next()) switch (e = e.value, e.nodeName) {
                        case "JavaScriptResource":
                            c.Ef = Y(e);
                            c.Th = e.getAttribute("apiFramework");
                            break;
                        case "VerificationParameters":
                            c.parameters = Y(e);
                            break;
                        case "TrackingEvents":
                            c.M = ko(e)
                    }
                    null != c.Ef && b.push(new bn(c))
                }
            }
            return b
        },
        ko = function(a) {
            var b = [];
            a = p(F(a));
            for (var c =
                    a.next(); !c.done; c = a.next()) {
                var d = c.value;
                if ("Tracking" == d.nodeName) {
                    c = d.getAttribute("event");
                    var e = Y(d);
                    if (null != e) {
                        d = d.getAttribute("offset");
                        var f = null,
                            g = null;
                        d && d.endsWith("%") ? g = parseInt(d, 10) : d && d.includes(":") && (f = jo(d));
                        b.push(new Yl(c, e, {
                            Xd: f,
                            Yd: g
                        }))
                    }
                }
            }
            return b
        };
    var mo = function() {
            this.Eh = []
        },
        no = function(a, b) {
            a.Eh.includes(b) || a.Eh.push(b)
        },
        oo = function(a, b) {
            var c = [];
            b = p(F(b));
            for (var d = b.next(); !d.done; d = b.next())
                if (d = d.value, "Extension" == d.nodeName)
                    for (var e = p(a.Eh), f = e.next(); !f.done; f = e.next())
                        if (f = f.value.parse(d), null != f) {
                            c.push(f);
                            break
                        }
            return c
        },
        uo = function(a) {
            var b = {};
            b.sequence = io(a, "sequence");
            b.id = a.getAttribute("id");
            b.adId = a.getAttribute("adId");
            a = p(F(a));
            for (var c = a.next(); !c.done; c = a.next()) switch (c = c.value, c.nodeName) {
                case "Linear":
                    for (var d =
                            void 0, e = void 0, f = void 0, g = [], h = [], k = [], m = p(F(c)), n = m.next(); !n.done; n = m.next()) switch (n = n.value, n.nodeName) {
                        case "TrackingEvents":
                            g = ko(n);
                            break;
                        case "VideoClicks":
                            f = po(n, "ClickThrough", "ClickTracking");
                            break;
                        case "MediaFiles":
                            h = [];
                            n = p(F(n));
                            for (var t = n.next(); !t.done; t = n.next())
                                if (t = t.value, "MediaFile" == t.nodeName) {
                                    var Z = Y(t);
                                    if (null != Z) {
                                        var P = {};
                                        P.height = io(t, "height");
                                        P.width = io(t, "width");
                                        P.ug = t.getAttribute("delivery");
                                        P.bitrate = io(t, "bitrate");
                                        P.Ka = io(t, "minBitrate");
                                        P.maxBitrate = io(t, "maxBitrate");
                                        P.mimeType = t.getAttribute("type");
                                        P.ia = t.getAttribute("apiFramework");
                                        P.pe = t.getAttribute("codec");
                                        h.push(new Wm(Z, P))
                                    }
                                }
                            break;
                        case "Duration":
                            e = jo(Y(n));
                            break;
                        case "AdParameters":
                            d = zb(Y(n));
                            break;
                        case "Icons":
                            for (k = [], n = p(F(n)), t = n.next(); !t.done; t = n.next()) t = t.value, "Icon" == t.nodeName && k.push(qo(t))
                    }
                    c = ro(c.getAttribute("skipoffset"), e);
                    b.tc = new Xm({
                        duration: e,
                        Za: c,
                        M: g,
                        dd: h,
                        Sf: f,
                        Qa: d,
                        Tg: k
                    });
                    break;
                case "NonLinearAds":
                    d = [];
                    e = [];
                    c = p(F(c));
                    for (f = c.next(); !f.done; f = c.next()) switch (f = f.value, f.nodeName) {
                        case "NonLinear":
                            d.push(so(f));
                            break;
                        case "TrackingEvents":
                            e = ko(f)
                    }
                    b.wh = new Zm(e);
                    break;
                case "CompanionAds":
                    d = [];
                    e = c.getAttribute("required");
                    "any" != e && "all" != e && (e = "none");
                    c = p(F(c));
                    for (f = c.next(); !f.done; f = c.next()) f = f.value, "Companion" == f.nodeName && d.push(to(f));
                    b.qg = new Tm(e);
                    break;
                case "UniversalAdId":
                    (d = Y(c)) || (d = c.getAttribute("idValue")), c = c.getAttribute("idRegistry"), b.hi = new $m({
                        Ug: c,
                        Vg: d
                    })
            }
            return new an(b)
        },
        ro = function(a, b) {
            if (null != a) return a.endsWith("%") && null != b ? parseInt(a, 10) * b / 100 : jo(a)
        },
        so = function(a) {
            var b = vo(a),
                c = a.getAttribute("id"),
                d = io(a, "width"),
                e = io(a, "height"),
                f = a.getAttribute("apiFramework"),
                g = jo(a.getAttribute("minSuggestedDuration")),
                h = null,
                k = null,
                m = [];
            a = p(F(a));
            for (var n = a.next(); !n.done; n = a.next()) {
                n = n.value;
                var t = Y(n);
                if (null != t) switch (n.nodeName) {
                    case "NonLinearClickThrough":
                        k = new Qm(t, n.getAttribute("id"));
                        break;
                    case "NonLinearClickTracking":
                        m.push(new Qm(t, n.getAttribute("id")));
                        break;
                    case "AdParameters":
                        h = zb(t)
                }
            }
            return new Ym({
                id: c,
                ia: f,
                width: d,
                height: e,
                qh: g,
                xh: k,
                yh: m,
                Xa: b,
                Qa: h
            })
        },
        to = function(a) {
            var b =
                vo(a),
                c = a.getAttribute("id"),
                d = a.getAttribute("adSlotID"),
                e = a.getAttribute("apiFramework"),
                f = io(a, "width"),
                g = io(a, "height"),
                h = [],
                k = null,
                m = [],
                n;
            a = p(F(a));
            for (n = a.next(); !n.done; n = a.next()) {
                var t = n.value;
                switch (t.nodeName) {
                    case "TrackingEvents":
                        h = ko(t);
                        break;
                    case "CompanionClickThrough":
                        n = Y(t);
                        null != n && (k = new Qm(n, t.getAttribute("id")));
                        break;
                    case "CompanionClickTracking":
                        n = Y(t), null != n && m.push(new Qm(n, t.getAttribute("id")))
                }
            }
            return new Sm({
                id: c,
                cg: d,
                ia: e,
                width: f,
                height: g,
                rg: k,
                sg: m,
                Xa: b,
                M: h
            })
        },
        qo =
        function(a) {
            var b = {};
            b.Kh = a.getAttribute("program");
            b.ia = a.getAttribute("apiFramework");
            b.width = io(a, "width");
            b.height = io(a, "height");
            b.wi = a.getAttribute("xPosition");
            b.xi = a.getAttribute("yPosition");
            b.duration = jo(a.getAttribute("duration"));
            b.offset = ro(a.getAttribute("offset"), b.duration);
            b.Xa = vo(a);
            b.Ye = [];
            a = p(F(a));
            for (var c = a.next(); !c.done; c = a.next()) switch (c = c.value, c.nodeName) {
                case "IconViewTracking":
                    b.Ye.push(Y(c));
                    break;
                case "IconClicks":
                    b.Sg = po(c, "IconClickThrough", "IconClickTracking")
            }
            return new Vm(b)
        },
        po = function(a, b, c) {
            var d = null,
                e = [],
                f = [];
            a = p(F(a));
            for (var g = a.next(); !g.done; g = a.next()) {
                g = g.value;
                var h = Y(g);
                if (null != h) {
                    var k = g.getAttribute("id");
                    switch (g.nodeName) {
                        case b:
                            d = new Qm(h, k);
                            break;
                        case c:
                            e.push(new Qm(h, k));
                            break;
                        case "CustomClick":
                            f.push(new Qm(h, k))
                    }
                }
            }
            return new Um({
                td: d,
                He: e,
                Me: f
            })
        },
        vo = function(a) {
            var b = [];
            a = p(F(a));
            for (var c = a.next(); !c.done; c = a.next()) {
                c = c.value;
                var d = Y(c);
                if (null != d) switch (c.nodeName) {
                    case "StaticResource":
                        b.push(new Rm(d, "Static", c.getAttribute("creativeType")));
                        break;
                    case "HTMLResource":
                        b.push(new Rm(d, "Html"));
                        break;
                    case "IFrameResource":
                        b.push(new Rm(d, "IFrame"))
                }
            }
            return b
        };
    var wo = function(a) {
            var b = void 0 === a.Di ? new co : a.Di,
                c = void 0 === a.gl ? [] : a.gl,
                d = void 0 === a.fl ? [] : a.fl,
                e = void 0 === a.Ck ? new mo : a.Ck;
            a = void 0 === a.Bk ? new mn : a.Bk;
            this.dg = b;
            this.Ci = c;
            this.Bi = d;
            this.jn = e;
            this.dn = new ym(a);
            this.G = Tl("AdsRequestProcessor")
        },
        zo = function(a, b) {
            a.dg.setTimeout(new xn(b.vastLoadTimeout));
            return a.dg.fetch(b).then(function(c) {
                return (c = xo(a, c)) ? yo(a, b, c) : ii(new ln("Parser returned an empty VAST response.", 1009))
            })
        },
        yo = function(a, b, c) {
            var d = [],
                e = {};
            c = p(c.U);
            for (var f = c.next(); !f.done; e = {
                    ye: e.ye
                }, f = c.next()) f = f.value, e.ye = new en, f = Ao(a, b, e.ye, f).then(function(b) {
                return a.Je(b)
            }, function(b) {
                return function(c) {
                    for (var d = [], e = c.zl, f = p(b.ye.U), g = f.next(); !g.done; g = f.next()) d = d.concat(g.value.aa.Ti);
                    f = a.dn;
                    e = vm(e);
                    Bm(f, d, e);
                    return ii(c)
                }
            }(e)), d.push(f);
            return li(d).then(function(a) {
                return new kn(a)
            })
        },
        Ao = function(a, b, c, d) {
            c.unshift(d);
            if (d.aa instanceof gn) return hi(c);
            d = d.aa;
            if (4 < c.U.length) return ii(new ln("Number of redirects exceeded the set limit.", 302));
            if (1 < c.U.length) {
                var e = 1 >
                    c.U.length ? null : c.U[0];
                if (null != e && e.aa instanceof ho && !e.aa.Re) return Ul(a.G, "Parent Wrapper restricted subsequent unwrapping."), hi(c)
            }
            return Bo(a, b, d.ze).then(function(d) {
                return Ao(a, b, c, d.U[0])
            })
        },
        Bo = function(a, b, c) {
            if (null == c) return ii(new ln("Wrapper Ad tag URI was empty.", 1013));
            b = b.clone();
            b.adTagUrl = c;
            b.adsResponse = null;
            return a.dg.fetch(b).then(function(b) {
                return xo(a, b)
            })
        };
    wo.prototype.Je = function(a) {
        a: {
            var b = p(this.Ci);
            for (var c = b.next(); !c.done; c = b.next())
                if (c = c.value, c.mk(a)) {
                    b = c;
                    break a
                }
            b = null
        }
        if (null != b) {
            b = b.Je(a);
            c = p(this.Bi);
            for (var d = c.next(); !d.done; d = c.next()) d.value.Lj(a, b);
            return b
        }
        throw new ln("Ad Provider was not found for ad.", 1014);
        throw new ln("CreateAd call failed.", 1014);
    };
    var xo = function(a, b) {
            try {
                var c = a.jn;
                if (!b) throw Error("VAST string is empty.");
                if (b && b.documentElement && "VAST" != !b.documentElement.nodeName) {
                    var d = b.documentElement.getAttribute("version");
                    if (d) {
                        var e = parseInt(d, 10);
                        var f = null == e || isNaN(e) ? null : e
                    } else f = null
                } else f = null;
                a = f;
                if (null == a || 2 > a || 4 < a) throw Error("Response string is not a valid VAST document.");
                a = [];
                for (var g = p(F(b.documentElement)), h = g.next(); !h.done; h = g.next()) {
                    var k = h.value;
                    if ("Ad" == k.nodeName) {
                        b = void 0;
                        var m = c;
                        f = {};
                        f.id = k.getAttribute("id");
                        f.sequence = io(k, "sequence");
                        for (var n = p(F(k)), t = n.next(); !t.done; t = n.next()) {
                            var Z = t.value;
                            if ("InLine" == Z.nodeName) {
                                for (var P = e = d = void 0, ic = void 0, Ka = void 0, mb = void 0, jc = [], rc = [], ak = [], ug = [], bk = p(F(Z)), vg = bk.next(); !vg.done; vg = bk.next()) {
                                    var wa = vg.value;
                                    switch (wa.nodeName) {
                                        case "AdSystem":
                                            mb = Y(wa);
                                            break;
                                        case "AdTitle":
                                            Ka = Y(wa);
                                            break;
                                        case "AdVerifications":
                                            ug = ug.concat(lo(wa));
                                            break;
                                        case "Advertiser":
                                            ic = Y(wa);
                                            break;
                                        case "Creatives":
                                            for (var ck = p(F(wa)), wg = ck.next(); !wg.done; wg = ck.next()) {
                                                var dk = wg.value;
                                                "Creative" == dk.nodeName && ak.push(uo(dk))
                                            }
                                            break;
                                        case "Description":
                                            P = Y(wa);
                                            break;
                                        case "Error":
                                            null != Y(wa) && jc.push(Y(wa));
                                            break;
                                        case "Extensions":
                                            d = oo(m, wa);
                                            break;
                                        case "Impression":
                                            var ek = Y(wa);
                                            null != ek && rc.push(ek);
                                            break;
                                        case "Survey":
                                            e = Y(wa)
                                    }
                                }
                                b = new gn({
                                    Aa: mb,
                                    Kc: Ka,
                                    fg: ic,
                                    description: P,
                                    ai: e,
                                    vb: jc,
                                    zb: rc,
                                    xa: ak,
                                    nb: ug,
                                    ka: d
                                });
                                break
                            } else if ("Wrapper" == Z.nodeName) {
                                P = e = d = void 0;
                                ic = m;
                                Ka = Z;
                                mb = [];
                                m = [];
                                jc = [];
                                rc = [];
                                for (var bp = "false" != Ka.getAttribute("followAdditionalWrappers"), cp = "true" == Ka.getAttribute("allowMultipleAds"),
                                        dp = "true" == Ka.getAttribute("fallbackOnNoAd"), fk = p(F(Ka)), xg = fk.next(); !xg.done; xg = fk.next()) {
                                    var pb = xg.value;
                                    switch (pb.nodeName) {
                                        case "AdSystem":
                                            P = Y(pb);
                                            break;
                                        case "VASTAdTagURI":
                                            var gk = Y(pb);
                                            e = gk ? gk : void 0;
                                            break;
                                        case "Creatives":
                                            for (var hk = p(F(pb)), yg = hk.next(); !yg.done; yg = hk.next()) {
                                                var ik = yg.value;
                                                "Creative" == ik.nodeName && jc.push(uo(ik))
                                            }
                                            break;
                                        case "Error":
                                            var jk = Y(pb);
                                            null != jk && mb.push(jk);
                                            break;
                                        case "AdVerifications":
                                            rc = rc.concat(lo(pb));
                                            break;
                                        case "Extensions":
                                            d = oo(ic, pb);
                                            break;
                                        case "Impression":
                                            var kk =
                                                Y(pb);
                                            null != kk && m.push(kk)
                                    }
                                }
                                b = new ho({
                                    Aa: P,
                                    Re: bp,
                                    hg: cp,
                                    Eg: dp,
                                    ze: e,
                                    vb: mb,
                                    zb: m,
                                    xa: jc,
                                    nb: rc,
                                    ka: d
                                });
                                break
                            }
                        }
                        if (!b) throw Error("Vast Ad contains neither inline nor wrapper data.");
                        a.push(new dn(b, f))
                    }
                }
                return new go(a)
            } catch (ep) {
                throw new ln(ep.message, 1015);
            }
        },
        Co = function(a, b) {
            a.Ci.unshift(b)
        },
        Do = function(a, b) {
            a.Bi.unshift(b)
        };
    var Eo = function(a) {
        this.M = a = void 0 === a ? [] : a
    };
    var Fo = function() {};
    Fo.prototype.Lj = function(a, b) {
        a = p(a.U);
        for (var c = a.next(); !c.done; c = a.next()) Go(c.value, b)
    };
    var Go = function(a, b) {
        a = p(a.aa.ka);
        for (var c = a.next(); !c.done; c = a.next()) c = c.value, c instanceof Eo && c.M.forEach(function(a) {
            bm(b, $l(a))
        })
    };
    var Ho = function(a, b) {
        this.Sm = a;
        this.rk = void 0 === b ? null : b
    };
    var Io = function(a, b) {
        Eo.call(this, a);
        this.Tm = b
    };
    q(Io, Eo);
    var Jo = function(a) {
        this.Hj = void 0 === a ? null : a
    };
    q(Jo, hn);
    Jo.prototype.mk = function(a) {
        a = (1 > a.U.length ? null : a.U[0]).aa;
        return a instanceof gn ? null != a.xa.find(function(a) {
            return null != a.tc
        }) : !1
    };
    Jo.prototype.Je = function(a) {
        var b = new lm;
        this.uf(a, b);
        return b
    };
    Jo.prototype.uf = function(a, b) {
        hn.prototype.uf.call(this, a, b);
        for (var c = p(a.U), d = c.next(); !d.done; d = c.next()) {
            d = d.value;
            for (var e = b, f = p(d.aa.xa), g = f.next(); !g.done; g = f.next()) {
                var h = g.value;
                if (g = h.tc) {
                    for (var k = p(g.M), m = k.next(); !m.done; m = k.next()) bm(e, $l(m.value));
                    if (k = g.Sf) {
                        m = p(k.He);
                        for (var n = m.next(); !n.done; n = m.next()) bm(e, new Zl("click", n.value.url));
                        m = p(k.Me);
                        for (n = m.next(); !n.done; n = m.next()) n = n.value, n.id && bm(e, new Zl(n.id, n.url))
                    }
                    d.aa instanceof gn && (e.duration = h.tc.duration, g.Qa && (e.Qa =
                        g.Qa), k && k.td && (e.sl = k.td.url), h = null, this.Hj ? h = this.Hj.select(g.dd) : 0 < g.dd.length && (h = g.dd[0]), h && (e.jm = h.url, e.im = h.height, e.km = h.width))
                }
            }
        }
        a: if (c = 1 > a.U.length ? null : a.U[0])
            if (d = fn(a, Ho), 0 < d.length)
                for (a = p(d), c = a.next(); !c.done; c = a.next()) c = c.value, c.Sm && (b.Za = c.rk ? c.rk : 5E3);
            else {
                d = fn(a, Eo);
                d = p(d);
                for (e = d.next(); !e.done; e = d.next())
                    for (e = p(e.value.M), f = e.next(); !f.done; f = e.next())
                        if ("skip" == f.value.Ui) {
                            b.Za = 5E3;
                            break a
                        }
                c = p(c.aa.xa);
                for (d = c.next(); !d.done; d = c.next())
                    if ((d = d.value.tc) && null != d.Za) {
                        b.Za =
                            d.Za;
                        break a
                    }
                a = fn(a, Io);
                a = p(a);
                for (c = a.next(); !c.done; c = a.next())
                    if ("Generic" == c.value.Tm) {
                        b.Za = 5E3;
                        break
                    }
            }
    };
    var Ko = function(a, b) {
        this.Ai = void 0 === a ? null : a;
        this.Zi = void 0 === b ? null : b
    };
    var Lo = function(a, b) {
        this.Ai = void 0 === a ? null : a;
        this.Zi = void 0 === b ? null : b
    };
    var Mo = function() {};
    Mo.prototype.Lj = function(a, b) {
        a = p(a.U);
        for (var c = a.next(); !c.done; c = a.next()) {
            a: {
                var d = b;c = p(c.value.aa.ka);
                for (var e = c.next(); !e.done; e = c.next())
                    if (e = e.value, e instanceof Lo) {
                        d.ka.set(Ko, new Ko(e.Ai, e.Zi));
                        d = !0;
                        break a
                    }
                d = !1
            }
            if (d) break
        }
    };
    var No = function(a, b, c) {
        b = void 0 === b ? !1 : b;
        c = void 0 === c ? !1 : c;
        Q.call(this);
        this.N = a;
        this.T = null;
        this.Xb = !1;
        this.Om = b && bc && !Ad || c;
        this.Gj = 8E3;
        this.je = null;
        this.jh = 0
    };
    q(No, Q);
    l = No.prototype;
    l.Zh = function() {
        this.he();
        this.T = new Cn(this);
        this.T.ma(this.N, "ended", this.Bh);
        this.T.ma(this.N, "pause", this.xm);
        this.T.ma(this.N, "playing", this.ym);
        this.T.ma(this.N, "timeupdate", this.Ch);
        this.T.ma(this.N, "volumechange", this.Em);
        this.T.ma(this.N, "error", this.qf);
        this.T.ma(this.N, "canplay", this.tm);
        this.T.ma(this.N, "canplaythrough", this.sm)
    };
    l.he = function() {
        null != this.T && (this.T.Ba(), this.T = null)
    };
    l.Ca = function() {
        Q.prototype.Ca.call(this);
        this.he()
    };
    l.getCurrentTime = function() {
        return this.N.currentTime
    };
    l.getDuration = function() {
        return isNaN(this.N.duration) ? -1 : this.N.duration
    };
    l.getVolume = function() {
        return this.N.volume
    };
    l.isMuted = function() {
        return this.N.muted
    };
    l.Bh = function() {
        (rn.ge || rn.Hg || (sn.ge || sn.Hg) && cc) && 1.5 < this.getDuration() - Math.max(this.jh, this.getCurrentTime()) || this.dispatchEvent("end")
    };
    l.xm = function() {
        this.dispatchEvent("pause")
    };
    l.ym = function() {
        this.dispatchEvent("play");
        this.Om && this.rf()
    };
    l.rf = function() {
        this.Xb || (this.Xb = !0, Oo(this), this.dispatchEvent("start"))
    };
    l.Ch = function() {
        var a = this.getCurrentTime();
        if (!this.Xb) {
            if (0 >= a) return;
            if (Ad && this.N.ended && 1 == this.getDuration()) {
                this.qf();
                return
            }
            this.rf()
        }
        this.jh = Math.max(this.jh, a);
        this.dispatchEvent("timeUpdate")
    };
    l.Em = function() {
        this.dispatchEvent("volumeChange")
    };
    l.qf = function() {
        Oo(this);
        this.dispatchEvent("error")
    };
    l.tm = function() {
        this.dispatchEvent("canPlay")
    };
    l.sm = function() {
        this.dispatchEvent("canPlayThrough")
    };
    l.load = function(a) {
        a && (this.N.src = a, this.N.load())
    };
    l.play = function() {
        this.N.play();
        Po(this)
    };
    l.pause = function() {
        this.N.pause();
        Oo(this)
    };
    var Po = function(a) {
            a.je || (a.je = xi(function() {
                a.Xb || a.dispatchEvent("mediaPlaybackTimeout")
            }, a.Gj))
        },
        Oo = function(a) {
            a.je && (r.clearTimeout(a.je), a.je = null)
        };
    No.prototype.setVolume = function(a) {
        this.N.volume = a;
        this.N.muted = 0 == a ? !0 : !1
    };
    No.prototype.canPlayType = function(a) {
        a = this.N.canPlayType(a);
        return "" != a && null != a
    };
    var Qo = {
            sn: "application/dash+xml",
            yn: "application/x-mpegURL",
            zn: "audio/mpeg",
            An: "video/mp4",
            Bn: "audio/mp4",
            Cn: "video/mpeg",
            Fn: "video/ogg",
            Nn: "video/3gpp"
        },
        Ro = [37],
        So = ["*.googlesyndication.com", "*.gvt1.com", "gcdn.2mdn.net"],
        To = function(a) {
            var b = this;
            a = void 0 === a ? {} : a;
            var c = void 0 === a.Dk ? null : a.Dk;
            this.jg = void 0 === a.ol ? 0 : a.ol;
            this.D = c;
            a = Kb(Qo);
            this.D && (a = a.filter(function(a) {
                return b.D.canPlayType(a)
            }));
            this.ll = a = a.map(function(a) {
                return a.toLowerCase()
            })
        };
    To.prototype.select = function(a) {
        var b = Uo(this, a);
        if (0 == b.length) var c = null;
        else {
            c = this.jg;
            0 >= c && (this.jg = c = df() ? 500 : 1E3);
            W.g().setParameter("smb", c);
            for (var d = c, e = null, f = p(b), g = f.next(); !g.done; g = f.next()) {
                g = g.value;
                var h = g.Ka,
                    k = g.maxBitrate;
                h > d || k < d || !(null == e || e.Ka > h) || (e = g)
            }
            if (!(d = e)) {
                d = c;
                e = null;
                f = p(b);
                for (g = f.next(); !g.done; g = f.next()) g = g.value, h = g.Ka, k = g.maxBitrate, k > d || (null == e || e.maxBitrate < k ? e = g : e.maxBitrate == k && e.Ka > h && (e = g));
                d = e
            }
            if (!d)
                for (d = null, e = p(b), f = e.next(); !f.done; f = e.next())
                    if (f =
                        f.value, g = f.Ka, h = f.maxBitrate, !(g < c))
                        if (null != d && d.Ka == g && d.maxBitrate < h) d = f;
                        else if (null == d || d.Ka > g) d = f;
            c = d
        }
        if (!c) return Vo(a, b), null;
        c.maxBitrate && c.maxBitrate < this.jg ? W.g().setParameter("br", c.maxBitrate) : c.Ka && W.g().setParameter("br", c.Ka);
        c.mimeType && W.g().setParameter("mt", c.mimeType);
        c.width && c.height && W.g().setParameter("vs", c.width + "x" + c.height);
        c.pe && W.g().setParameter("vc", c.pe);
        return c
    };
    var Uo = function(a, b) {
            b = b.filter(function(b) {
                return a.ll.includes(zb(b.mimeType).toLowerCase())
            });
            return b = b.filter(function(a) {
                a: {
                    a = a.url;
                    if (bc && im(So, a) && (a = (new ll(a)).$) && 0 == a.lastIndexOf("/videoplayback/", 0) && (a = a.match(/itag\/(\d+)\//)) && Ro.includes(parseInt(a[1], 10))) {
                        a = !0;
                        break a
                    }
                    a = !1
                }
                return !a
            })
        },
        Vo = function(a, b) {
            var c = [],
                d = !1;
            a.forEach(function(a) {
                a = zb(a.mimeType).toLowerCase();
                c.push(a);
                "application/javascript" == a && (d = !0)
            });
            a = b.map(function(a) {
                return zb(a.mimeType).toLowerCase()
            });
            W.g().ab("vamt",
                c.join());
            W.g().ab("plmt", a.join());
            W.g().ab("hjsm", zb(d));
            sm()
        };
    var Wo = function() {};
    q(Wo, un);
    Wo.prototype.Xh = function(a) {
        return "bid.g.doubleclick.net" == (new ll(a)).ea
    };
    Wo.prototype.ng = function(a) {
        if (null == a.adTagUrl) return null;
        var b = Xo(a),
            c = new ll(a.adTagUrl);
        b.forEach(function(a, b) {
            kb(a) ? c.removeParameter(b) : (V(c), c.Na.set(b, a))
        });
        ml(c, "https");
        return c.toString()
    };
    var Xo = function(a) {
        var b = new Map;
        b.set("sdkv", "h.0.0.0");
        b.set("osd", 2);
        a: {
            try {
                var c = window.top.location.href
            } catch (d) {
                c = 2;
                break a
            }
            c = null == c ? 2 : c == window.document.location.href ? 0 : 1
        } - 1 != c && b.set("frm", c);
        b.set("sdr", 1);
        b.set("vpa", a.re);
        return b
    };
    var Yo = function(a, b, c, d) {
        d = void 0 === d ? !1 : d;
        Q.call(this);
        this.oa = a;
        this.Xb = !1;
        this.T = null;
        this.Bg = new Set;
        this.D = b;
        this.G = Tl("VideoAdTracker");
        this.hn = c;
        this.gn = d;
        this.Ri = this.Wm = !1;
        this.Wb = new Map
    };
    q(Yo, Q);
    Yo.prototype.Zh = function() {
        this.he();
        this.D.Zh();
        this.T = new Cn(this);
        Hm(this.oa, um(this.D));
        this.T.ma(this.D, "start", this.rf);
        this.T.ma(this.D, "timeUpdate", this.Ch);
        this.T.ma(this.D, "end", this.Bh);
        this.T.ma(this.D, "error", this.qf);
        this.T.ma(this.D, "mediaPlaybackTimeout", this.wm)
    };
    Yo.prototype.he = function() {
        this.D.he();
        null != this.T && this.T.Ba();
        this.Bg.clear()
    };
    Yo.prototype.lb = function(a) {
        this.oa.Oa(a)
    };
    var Zo = function(a, b) {
        a: switch (b) {
            case "error":
                var c = !1;
                break a;
            default:
                c = !0
        }
        if (c && !a.Xb) Ul(a.G, "Event being dispatched/reported before a start event: " + b),
        W.g().ab("trackPrestart", "" + b),
        sm();
        else {
            a: switch (b) {
                case "error":
                    c = !0;
                    break a;
                default:
                    c = !1
            }
            if (c || !a.Bg.has(b)) a.lb(b),
            Vl(a.G, "dispatching event " + b),
            a.Bg.add(b),
            a.dispatchEvent(b)
        }
    };
    Yo.prototype.Ch = function() {
        if (!(0 > $o(this))) {
            var a = this.D.getCurrentTime();
            1E3 * a > .25 * $o(this) && Zo(this, "firstQuartile");
            1E3 * a > .5 * $o(this) && Zo(this, "midpoint");
            1E3 * a > .75 * $o(this) && Zo(this, "thirdQuartile");
            a = this.D.getCurrentTime();
            5 <= a && !this.Wb.get("5s") && (tm("5s"), this.Wb.set("5s", !0));
            10 <= a && !this.Wb.get("10s") && (tm("10s"), this.Wb.set("10s", !0));
            30 <= a && !this.Wb.get("30s") && (tm("30s"), this.Wb.set("30s", !0));
            2E3 >= $o(this) - 1E3 * a && !this.Wb.get("2sbc") && (tm("2sbc"), this.Wb.set("2sbc", !0));
            ap(this);
            Em(this.oa,
                this.D.getCurrentTime())
        }
    };
    var ap = function(a) {
            a.Wm && !a.Ri && (30 < a.D.getCurrentTime() || a.D.N.ended) && a.D.Xb && (a.Ri = !0, Zo(a, "engagedView"))
        },
        $o = function(a) {
            return a.gn && 0 < a.D.getDuration() ? 1E3 * a.D.getDuration() : a.hn
        };
    Yo.prototype.rf = function() {
        this.Xb = !0;
        Zo(this, "start");
        Zo(this, "impression");
        Zo(this, "creativeView");
        W.g().setParameter("dm", $o(this))
    };
    Yo.prototype.Bh = function() {
        ap(this);
        Zo(this, "complete");
        var a = $o(this) - 1E3 * this.D.getCurrentTime();
        W.g().ab("endedMediaDiff", "" + a);
        sm()
    };
    Yo.prototype.qf = function() {
        this.dispatchEvent("error");
        Fm(this.oa, 400)
    };
    Yo.prototype.wm = function() {
        this.dispatchEvent("error");
        Fm(this.oa, 402)
    };
    var fp = function() {};
    fp.prototype.parse = function(a) {
        var b = [];
        a = p(F(a));
        for (var c = a.next(); !c.done; c = a.next()) c = c.value, "CustomTracking" == c.nodeName && b.push.apply(b, oa(ko(c)));
        return 0 < b.length ? new Eo(b) : null
    };
    var gp = function() {};
    gp.prototype.parse = function(a) {
        if (!a.hasAttribute("type") || "metrics" != a.getAttribute("type").toLowerCase()) return null;
        a = p(F(a));
        for (var b = a.next(); !b.done; b = a.next()) switch (b = b.value, b.nodeName) {
            case "AdEventId":
                var c = $c(b);
                break;
            case "FeEventId":
                var d = $c(b)
        }
        return new Lo(c, d)
    };
    var np = function(a, b, c, d, e, f) {
        Q.call(this);
        if (null == a) throw Error("video container div is undefined.");
        Ed(a, "position", "relative");
        Ed(a, "margin", "auto");
        this.Z = a;
        this.o = this.Ie = null;
        this.gm = a.style.width;
        this.fm = a.style.height;
        this.il = b;
        this.ud = c;
        this.ci = d;
        this.jl = f || 0;
        this.w = this.Ub = this.ha = this.La = null;
        this.uj = this.ad = this.Nd = this.Tj = !1;
        this.ra = this.v = null;
        this.K = this.Z.clientWidth;
        console.log("videoContainerWidth: " + this.Z.clientWidth);
        0 >= this.K && (this.K = 256, console.log("video div clientWidth is zero, assuming width 256px."));
        this.eh = !1;
        this.Gc = 16 / 9;
        this.O = this.Z.clientHeight;
        console.log("videoContainerHeight: " + this.Z.clientHeight);
        0 >= this.O && (console.log("video div height is zero, assuming fluid height."), this.eh = !0, this.O = parseInt(this.K / this.Gc, 10), Kd(this.Z, this.K, this.O));
        this.mi = this.Of = !1;
        this.Xf = 0;
        this.li = !1;
        this.ti = 0;
        "undefined" !== typeof $sf ? (console.log("use safeframe API."), this.Of = !0) : x(window.IntersectionObserver) ? (console.log("use intersection observer."), this.li = !0, a = y(function(a) {
            var b = this;
            a.forEach(function(a) {
                a =
                    100 * a.intersectionRatio;
                a != b.ti && (b.ti = a, b.Ng("geom-update", null), console.log("io view percentage: " + a))
            })
        }, this), (new IntersectionObserver(a, {
            threshold: [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]
        })).observe(this.Z)) : x(window.osdlamrc) && (console.log("use osd listener."), this.mi = !0, a = y(function(a) {
            a && (a = a[7]) && w(a) && (a *= 100, a != this.Xf && (this.Xf = a, this.Ng("geom-update", null), console.log("osd view percentage: " + this.Xf)))
        }, this), window.osdlamrc(a));
        (this.ff = hp(this)) ? console.log("video autoplay supported."): console.log("Warning: video autoplay not supported.");
        this.Ie = Tc("DIV");
        Ed(this.Ie, "position", "absolute");
        this.Z.appendChild(this.Ie);
        this.o = Tc("VIDEO");
        this.o.muted = !0;
        this.o.volume = 0;
        cc && this.o.setAttribute("playsinline", "true");
        this.o.width = this.K;
        this.o.height = this.O;
        this.Ie.appendChild(this.o);
        Bh(this.o, "playing", y(this.Dm, this));
        Bh(this.o, "ended", y(this.Bm, this));
        Bh(this.o, "pause", y(this.Cm, this));
        ip(this);
        jp(this);
        this.Ub = Tc("IMG");
        this.Ub.src = "https://www.gstatic.com/dfp/native/replay.png";
        Ed(this.Ub, kp);
        this.Ub.style.display = "none";
        this.Z.appendChild(this.Ub);
        Bh(this.Ub, "click", y(this.Mm, this));
        this.Ab = new No(this.o);
        this.Ab.Gj = 6E4;
        lp(this, this.il);
        this.ff || mp(this);
        Bh(window, "resize", y(this.Fm, this))
    };
    q(np, Q);
    var hp = function(a) {
            if (!(a.Of || a.mi || a.li)) return !1;
            a = document.createElement("video");
            a.muted = !0;
            a.setAttribute("muted", "true");
            a.setAttribute("playsinline", "true");
            a.play();
            var b = !a.paused;
            Vc(a);
            return b
        },
        lp = function(a, b) {
            var c = new Pm;
            c.vastLoadTimeout = 6E4;
            c.adsResponse = b;
            b = new mo;
            no(b, new fp);
            no(b, new gp);
            var d = new co;
            d.Nh(new Wo);
            b = new wo({
                Ck: b,
                Di: d,
                Bk: a.zj
            });
            Co(b, new Jo(new To({
                Dk: a.Ab
            })));
            Do(b, new Fo);
            Do(b, new Mo);
            zo(b, c).then(function(b) {
                b = b.getAds();
                if (1 > b.length) console.log("Error: ads length < 1");
                else {
                    b = b[0];
                    a.o.src = b.getMediaUrl();
                    a.o.preload = "auto";
                    1 > a.ud.length && (a.ud = b.getClickThroughUrl());
                    a.zj = new mn;
                    a.sc = new Cm(b, a.zj);
                    (new Yo(a.sc, a.Ab, b.duration || 0, !b.duration || 0 >= b.duration)).Zh();
                    b = new xd(a.jl, void 0);
                    var c = new Nm(a.sc, a.Ab, !0);
                    c.xe = new xd(b.pb, b.bb);
                    c.Zk && yd(c.xe) && (M.g().Va = !0, Vk.g(), b = c.xe, Bj.g().Qc = b);
                    a.o.volume = 0;
                    a.ff && (op(a) && (a.Ab.play(), pp(a)), a.Of && $sf.ext.register(a.K, a.O, y(a.Ng, a)))
                }
            }, function() {
                console.log("Failed to retriev ads from VAST")
            })
        },
        mp = function(a) {
            a.v = Tc("IMG");
            a.v.id = "thumbnail-click-to-play";
            a.v.src = a.ci;
            a.v.style.display = "none";
            a.Z.appendChild(a.v);
            Bh(a.v, "load", y(function() {
                var a = 1;
                1 < this.v.height && 1 < this.v.width && (a = Math.min(this.K / this.v.width, this.O / this.v.height));
                this.v.width = parseInt(this.v.width * a, 10);
                this.v.height = parseInt(this.v.height * a, 10);
                Ed(this.v, {
                    display: "block",
                    position: "absolute",
                    "z-index": 2,
                    top: parseInt((this.O - this.v.height) / 2, 10) + "px",
                    left: parseInt((this.K - this.v.width) / 2, 10) + "px"
                })
            }, a));
            a.ra = Tc("IMG");
            a.ra.src = "https://www.gstatic.com/images/icons/material/system/2x/play_circle_filled_white_googblue_48dp.png";
            a.ra.width = 96;
            a.ra.height = 96;
            Ed(a.ra, {
                display: "block",
                position: "absolute",
                "z-index": 4,
                top: parseInt((a.O - 96) / 2, 10) + "px",
                left: parseInt((a.K - 96) / 2, 10) + "px"
            });
            Bh(a.ra, "click", y(function() {
                null != this.v && Vc(this.v);
                null != this.ra && Vc(this.ra);
                this.Ab.play();
                pp(this)
            }, a));
            a.Z.appendChild(a.ra)
        },
        ip = function(a) {
            a.La = Tc("IMG");
            a.La.src = "https://www.gstatic.com/dfp/native/volume_off.png";
            Ed(a.La, qp);
            a.La.style.display = "none";
            a.Z.appendChild(a.La);
            Bh(a.La, ["touchstart", "click"], y(function(a) {
                a.stopPropagation();
                a.preventDefault();
                0 == ("boolean" == typeof this.o.muted ? this.o.muted ? 0 : 1 : this.o.volume) ? (this.o.volume = 1, this.o.muted = !1, this.La.src = "https://www.gstatic.com/dfp/native/volume_on.png", this.sc.Oa("unmute")) : (this.o.volume = 0, this.o.muted = !0, this.La.src = "https://www.gstatic.com/dfp/native/volume_off.png", this.sc.Oa("mute"))
            }, a))
        },
        jp = function(a) {
            a.ha = Tc("IMG");
            a.ha.src = "https://www.gstatic.com/dfp/native/pause.png";
            Ed(a.ha, rp);
            a.ha.style.display = "none";
            a.Z.appendChild(a.ha);
            Bh(a.ha, "click", y(function() {
                this.Tj = !0;
                this.ad ? (sp(this), this.sc.Oa("pause")) : (tp(this), this.sc.Oa("resume"))
            }, a))
        };
    np.prototype.Dm = function() {
        console.log("video is playing");
        this.ad = !0;
        this.Nd || (this.Nd = !0, up(this), vp(this));
        this.ha && (this.ha.src = "https://www.gstatic.com/dfp/native/pause.png")
    };
    np.prototype.Bm = function() {
        this.Ub.style.display = "block";
        this.La && (this.La.style.display = "none");
        this.ha && (this.ha.style.display = "none");
        console.log("video complete");
        this.uj = !0;
        this.Nd = this.ad = !1;
        1 < this.ci.length && (this.o.style.display = "none", wp(this))
    };
    np.prototype.Cm = function() {
        console.log("video paused");
        this.ad = !1;
        this.ha && (this.ha.src = "https://www.gstatic.com/dfp/native/play.png")
    };
    var up = function(a) {
        console.log("resizeVideoAd is called");
        a.o && (console.log("videoWidth: " + a.o.videoWidth), console.log("videoHeight: " + a.o.videoHeight), 1 < a.o.videoWidth && 1 < a.o.videoHeight && (a.Gc = a.o.videoWidth / a.o.videoHeight, a.eh ? a.O = parseInt(a.K / a.Gc, 10) : a.K / a.O > a.Gc ? a.K = parseInt(a.O * a.Gc, 10) : a.O = parseInt(a.K / a.Gc, 10), Kd(a.Z, a.K, a.O), a.o.width = a.K, a.o.height = a.O))
    };
    np.prototype.Fm = function() {
        this.Z.style.width = this.gm;
        this.Z.style.height = this.eh ? parseInt(this.Z.clientWidth / this.Gc, 10) + "px" : this.fm;
        this.K = this.Z.clientWidth;
        this.O = this.Z.clientHeight;
        up(this);
        if (null != this.v && "none" != this.v.style.display) {
            var a = 1;
            1 < this.v.height && 1 < this.v.width && (a = Math.min(this.K / this.v.width, this.O / this.v.height));
            this.v.width = parseInt(this.v.width * a, 10);
            this.v.height = parseInt(this.v.height * a, 10);
            a = parseInt((this.O - this.v.height) / 2, 10);
            var b = parseInt((this.K - this.v.width) /
                2, 10);
            Ed(this.v, {
                display: "block",
                position: "absolute",
                "z-index": 2,
                top: a + "px",
                left: b + "px"
            })
        }
        null != this.ra && "none" != this.ra.style.display && (a = .75 * Math.min(this.O, this.K), this.ra.width = a, this.ra.height = a, Ed(this.ra, {
            display: "block",
            position: "absolute",
            "z-index": 4,
            top: parseInt((this.O - a) / 2, 10) + "px",
            left: parseInt((this.K - a) / 2, 10) + "px"
        }));
        null != this.w && "none" != this.w.style.display && 1 < this.w.height && 1 < this.w.width && (a = Math.min(this.K / this.w.width, this.O / this.w.height), this.w.width = parseInt(this.w.width * a,
            10), this.w.height = parseInt(this.w.height * a, 10), a = parseInt((this.O - this.w.height) / 2, 10), b = parseInt((this.K - this.w.width) / 2, 10), Ed(this.w, {
            display: "block",
            position: "absolute",
            "z-index": 10,
            top: a + "px",
            left: b + "px"
        }))
    };
    var vp = function(a) {
            a.La && (a.La.style.display = "block");
            a.ha && (a.ha.style.display = "block")
        },
        pp = function(a) {
            1 > a.ud.length || Bh(a.o, "click", y(function() {
                var a = this.ud,
                    c;
                c || (c = {});
                var d = window;
                if (a instanceof Bc) var e = a;
                else e = "undefined" != typeof a.href ? a.href : String(a), e instanceof Bc || (e = e.Yc ? e.Wc() : String(e), Dc.test(e) || (e = "about:invalid#zClosurez"), e = Ec(e));
                a = c.target || a.target;
                var f = [];
                for (g in c) switch (g) {
                    case "width":
                    case "height":
                    case "top":
                    case "left":
                        f.push(g + "=" + c[g]);
                        break;
                    case "target":
                    case "noopener":
                    case "noreferrer":
                        break;
                    default:
                        f.push(g + "=" + (c[g] ? 1 : 0))
                }
                var g = f.join(",");
                (Sb() || B("iPad") || B("iPod")) && d.navigator && d.navigator.standalone && a && "_self" != a ? (g = d.document.createElement("A"), Ic(g, e), g.setAttribute("target", a), c.noreferrer && g.setAttribute("rel", "noreferrer"), c = document.createEvent("MouseEvent"), c.initMouseEvent("click", !0, !0, d, 1), g.dispatchEvent(c)) : c.noreferrer ? (d = d.open("", a, g), e = Cc(e), d && (Zb && -1 != e.indexOf(";") && (e = "'" + e.replace(/'/g, "%27") + "'"), d.opener = null, c = xc("b/12014412, meta tag with sanitized URL"),
                    e = '<meta name="referrer" content="no-referrer"><meta http-equiv="refresh" content="0; url=' + vb(e) + '">', Ra(wc(c), "must provide justification"), z(!kb(wc(c)), "must provide non-empty justification"), d.document.write(Hc((new Gc).Tl(e))), d.document.close())) : (d = d.open(Cc(e), a, g)) && c.noopener && (d.opener = null);
                this.sc.Oa("click")
            }, a))
        };
    np.prototype.Mm = function() {
        null != this.w && (this.w.style.display = "none");
        this.Ub.style.display = "none";
        vp(this);
        this.o.style.display = "block";
        this.o.controls = !1;
        this.o.autoplay = !0;
        this.o.load();
        tp(this)
    };
    var wp = function(a) {
        var b = Tc("A");
        Ic(b, a.ud);
        b.target = "_blank";
        a.w = Tc("IMG");
        a.w.src = a.ci;
        a.w.id = "video-thumbnail-image";
        a.w.style.display = "none";
        b.appendChild(a.w);
        a.Z.appendChild(b);
        Bh(a.w, "load", y(function() {
            if (1 < this.w.height && 1 < this.w.width) {
                var a = Math.min(this.K / this.w.width, this.O / this.w.height);
                this.w.width = parseInt(this.w.width * a, 10);
                this.w.height = parseInt(this.w.height * a, 10);
                Ed(this.w, {
                    display: "block",
                    position: "absolute",
                    "z-index": 10,
                    top: parseInt((this.O - this.w.height) / 2, 10) + "px",
                    left: parseInt((this.K -
                        this.w.width) / 2, 10) + "px"
                })
            }
        }, a))
    };
    np.prototype.Ng = function(a) {
        "geom-update" != a || !this.ff || this.Tj || this.uj || (op(this) ? this.Nd ? this.ad || tp(this) : (this.Ab.play(), pp(this)) : this.Nd && this.ad && sp(this))
    };
    var tp = function(a) {
            a.Ab.play();
            a.ha.src = "https://www.gstatic.com/dfp/native/pause.png"
        },
        sp = function(a) {
            a.Ab.pause();
            a.ha.src = "https://www.gstatic.com/dfp/native/play.png"
        },
        op = function(a) {
            return a.Of ? 33.75 < $sf.ext.inViewPercentage() : a.mi ? 33.75 < a.Xf : a.li ? 33.75 < a.ti : !0
        },
        qp = {
            position: "absolute",
            "z-index": 10,
            bottom: "8px",
            left: "8px",
            width: "24px",
            height: "24px"
        },
        rp = {
            position: "absolute",
            "z-index": 10,
            bottom: "8px",
            right: "8px",
            width: "24px",
            height: "24px"
        },
        kp = {
            position: "absolute",
            "z-index": 12,
            top: "8px",
            left: "8px",
            width: "24px",
            height: "24px"
        },
        xp = function(a, b, c, d, e, f) {
            Q.call(this);
            xi(y(function() {
                new np(a, b, c, d, e, f)
            }, this), 1, this)
        };
    q(xp, Q);
    Ia("GoogleWebVideo", np);
    Ia("BackfillWebVideo", xp);
})();